import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { analyzeExamResult, ExamAnalysisResult } from "../../functions/result-analysis.function";
import { ToasterService } from "src/app/services/toaster/toaster.service";
import { RealTimeDataBaseService } from "src/app/shared/db/real-time-data-base.service";

@Component({
  selector: "app-advanced-studies",
  templateUrl: "./advanced-studies.component.html",
  styleUrls: ["./advanced-studies.component.scss"],
})
export class AdvancedStudiesComponent implements OnInit {
  examStarted = false;
  examYears: string[] = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"];
  papers: string[] = ["1", "2"];
  selectedYear: string = "2024";
  selectedPaper: string = "1";
  questions: number[] = [];
  options: string[] = ["a", "b", "c", "d"];
  answersForm: FormGroup;
  currentQuestionIndex: any;
  showResultAnalysis = false;
  resultAnalysis: ExamAnalysisResult | null = null;
  loading = false;
  userData: any = null;
  resultHistoryList: any;
  constructor(
    private fb: FormBuilder,
    private rtdb: RealTimeDataBaseService,
    private toaster: ToasterService,
  ) {
    this.answersForm = this.fb.group({});
  }

  ngOnInit() {
    // Check if there is an ongoing exam in local storage
    const examMeta = localStorage.getItem("pyq_exam_meta");
    if (examMeta) {
      const meta = JSON.parse(examMeta);
      this.selectedYear = meta.year;
      this.selectedPaper = meta.paper;
      this.examStarted = true;
      this.setQuestionsByPaper(this.selectedPaper);
      // Restore answers
      const answersStr = localStorage.getItem(`pyq_answers_${this.selectedYear}_${this.selectedPaper}`);
      if (answersStr) {
        const answers = JSON.parse(answersStr);
        Object.keys(answers).forEach((key) => {
          if (this.answersForm.controls[key]) {
            this.answersForm.controls[key].setValue(answers[key], { emitEvent: false });
          }
        });
      }
    }
    this.userData = localStorage.getItem("UserData");
    if (this.userData) {
      this.userData = JSON.parse(this.userData);
    }
    this.getPyqResults();
  }

  setQuestionsByPaper(paper: string) {
    this.selectedPaper = paper;
    const count = paper === "1" ? 100 : 80;
    this.questions = Array.from({ length: count }, (_, i) => i + 1);
    const group: any = {};
    let answers: any = {};
    const answersStr = localStorage.getItem(`pyq_answers_${this.selectedYear}_${paper}`);
    if (answersStr) {
      answers = JSON.parse(answersStr);
    }
    this.questions.forEach((num) => {
      group["q" + num] = [answers["q" + num] || ""];
    });
    this.answersForm = this.fb.group(group);
    this.answersForm.valueChanges.subscribe((val) => {
      localStorage.setItem(`pyq_answers_${this.selectedYear}_${paper}`, JSON.stringify(val));
    });
  }

  startExam() {
    this.setQuestionsByPaper(this.selectedPaper);
    this.examStarted = true;
    this.showResultAnalysis = false;
    this.resultAnalysis = null;
    // Save exam meta
    localStorage.setItem("pyq_exam_meta", JSON.stringify({ year: this.selectedYear, paper: this.selectedPaper }));
  }

  onPaperChange(event: any) {
    this.setQuestionsByPaper(event.detail.value);
    // Update meta if in exam
    if (this.examStarted) {
      localStorage.setItem("pyq_exam_meta", JSON.stringify({ year: this.selectedYear, paper: event.detail.value }));
    }
  }

  onYearChange(event: any) {
    this.selectedYear = event.detail.value;
    if (this.examStarted) {
      this.setQuestionsByPaper(this.selectedPaper);
      localStorage.setItem("pyq_exam_meta", JSON.stringify({ year: this.selectedYear, paper: this.selectedPaper }));
    }
  }

  async onSubmit() {
    this.loading = true;
    // Fetch the answer key from the database and only then analyze
    let correctAnswers: { [key: string]: string } = {};
    let rawAnswerData: any = {};
    const path = `upscPyqAnswers/${this.selectedYear}/paper${this.selectedPaper}`;

    try {
      rawAnswerData = await this.rtdb.getAnswerKey(path);
      const raw = rawAnswerData.answer_key_A || {};
      // console.log("Raw answer key data:", raw);
      Object.keys(raw).forEach((k) => {
        correctAnswers[k.toString()] = raw[k];
      });
    } catch (error) {
      this.toaster.showToast("Error fetching target exams", "danger");
      return;
    }

    const userAnswers: { [key: string]: string } = {};
    Object.keys(this.answersForm.value).forEach((key) => {
      userAnswers[key.replace("q", "")] = this.answersForm.value[key];
    });
    this.resultAnalysis = analyzeExamResult(userAnswers, correctAnswers);
    this.calculateScore(this.resultAnalysis, rawAnswerData);
    this.showResultAnalysis = true;
    // Optionally clear meta and answers after submit
    localStorage.removeItem("pyq_exam_meta");
    localStorage.removeItem(`pyq_answers_${this.selectedYear}_${this.selectedPaper}`);
    this.examStarted = false;
    this.answersForm.reset();
    this.questions = [];
    this.loading = false;
    this.selectedPaper = "1";
    this.selectedYear = "2024";
  }

  calculateScore(result: ExamAnalysisResult, rawAnswerData: any) {
    const correctMarksScore = rawAnswerData.correct_marks || 2;
    const incorrectMarksScore = rawAnswerData.incorrect_marks || 0.67;
    this.resultAnalysis.fullMarks = rawAnswerData.full_marks || 200;

    this.resultAnalysis.correctScore = result.correct * correctMarksScore;

    const calculatedIncorrectScore = result.wrong * incorrectMarksScore;
    this.resultAnalysis.incorrectScore = Math.round(calculatedIncorrectScore * 100) / 100;

    this.resultAnalysis.unansweredScore = result.unanswered * correctMarksScore;

    const calculatedTotalScore = this.resultAnalysis.correctScore - this.resultAnalysis.incorrectScore;
    this.resultAnalysis.totalScore = Math.round(calculatedTotalScore * 100) / 100;

    const totalAttempted = result.correct + result.wrong;
    this.resultAnalysis.accuracy = totalAttempted > 0 ? ((result.correct / totalAttempted) * 100).toFixed(2) : "0.00";

    console.log(this.resultAnalysis);
    this.saveResult();
  }

  saveResult() {
    const resultData = {
      year: this.selectedYear,
      paper: this.selectedPaper,
      analysis: this.resultAnalysis,
      attemptedOn: new Date().toISOString(),
    };
    localStorage.setItem("pyq_result_" + this.selectedYear + "_" + this.selectedPaper, JSON.stringify(resultData));
    const attemptId = Date.now().toString();
    this.rtdb
      .saveResult(`pyqResults/${this.userData.uid}/${this.selectedYear}/${this.selectedPaper}/${attemptId}`, resultData)
      .then(() => {
        console.log("Result saved successfully");
      });
    this.toaster.showToast("Result saved successfully", "success");
  }

  showResult() {
    this.showResultAnalysis = true;
  }

  exitExam() {
    this.examStarted = false;
    this.answersForm.reset();
    // Remove all pyq-related local storage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("pyq_")) {
        localStorage.removeItem(key);
      }
    });
  }
  copyResult() {
    const resultText = `
    Result Analysis for ${this.selectedYear} Paper ${this.selectedPaper}
    Total Questions: ${this.resultAnalysis.total}
    Correct: ${this.resultAnalysis.correct}
    Wrong: ${this.resultAnalysis.wrong}
    Un-attempted: ${this.resultAnalysis.unanswered}
    Correct Score: ${this.resultAnalysis.correctScore}
    Incorrect Score: ${this.resultAnalysis.incorrectScore}
    Final Score: ${this.resultAnalysis.totalScore}
    Accuracy: ${this.resultAnalysis.accuracy}%
    `;
    navigator.clipboard.writeText(resultText).then(() => {
      this.toaster.showToast("Result copied to clipboard", "success");
    });
  }

  clearAnswer(q: number) {
    this.answersForm.get("q" + q)?.setValue(null);
  }

  getPyqResults() {
    const result = localStorage.getItem("pyq_result_" + this.selectedYear + "_" + this.selectedPaper);
    const resultHistory = this.rtdb.getResult(
      "pyqResults/" + this.userData.uid + "/" + this.selectedYear + "/" + this.selectedPaper,
    );
    resultHistory.subscribe((data) => {
      if (data) {
        this.resultHistoryList = Object.keys(data).map((key: any) => {
          return {
            attemptId: key,
            ...data[key],
          };
        });
      }
    });
    if (result) {
      return JSON.parse(result);
    }
    return null;
  }
}

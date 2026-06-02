import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { CustomDate } from "src/app/models/class/date/custom-date";
import { serverTimestamp } from "@angular/fire/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExpenseService } from "src/app/services/expense/expense.service";
import { SeoService } from "src/app/services/seo/seo.service";
import { Expense, Options } from "src/app/models/interface/masterData.model";
import { AlertService } from "src/app/services/alert/alert.service";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { Analyze } from "./modules/analyze";
import { SeoTags } from "src/app/models/class/seoTags/seo";
import { ExpenseData } from "src/app/models/interface/expense.interface";
import { SpeechRecognitionService } from "src/app/services/speech-recognition/speech-recognition.service";
import { ExpenseStaticData } from "src/app/models/class/static/expense/expense-data";
import { ModalController } from "@ionic/angular";
import { FilterExpenseComponent } from "./components/filter-expense/filter-expense.component";
import { ToasterService } from "src/app/services/toaster/toaster.service";

import { GeminiService } from "src/app/services/gemini/gemini";

@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.page.html",
  styleUrls: ["./expenses.page.scss"],
})
export class ExpensesPage implements OnInit {
  @Output() expenseData = new EventEmitter<any>();
  pageTitle = "Expenses";
  pageMetaTags = SeoTags.expensePageTags;
  dateToday: string | null = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  expenseOf: string = this.dateToday;
  expenseByDate: any;
  recognizedText: string = ""; // Holds the recognized speech
  isListening: boolean = false; // For toggling the mic button and animation
  quickAddInput: string = "";
  isProcessingQuickAdd: boolean = false;
  autoAdd: boolean = false;
  parsedExpenses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private seoService: SeoService,
    private expenseService: ExpenseService,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private router: Router,
    private speechRecognitionService: SpeechRecognitionService,
    private geminiService: GeminiService,
    private toaster: ToasterService,
    private modalController: ModalController, // New injection
  ) {}

  async processQuickAdd() {
    if (!this.quickAddInput.trim()) return;

    this.isProcessingQuickAdd = true;
    try {
      const expenses = await this.geminiService.processExpenseDescription(
        this.quickAddInput,
        this.dateToday || new Date().toISOString().split("T")[0],
      );
      if (expenses && expenses.length > 0) {
        if (this.autoAdd) {
          this.confirmAddAll(expenses);
        } else {
          this.parsedExpenses = expenses.map(exp => ({
            ...exp,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          }));
          this.toaster.showToast(`${expenses.length} Expenses parsed for review.`, "primary");
        }
        this.quickAddInput = "";
      } else {
        this.toaster.showToast("Could not parse expenses from the statement.", "warning");
      }
    } catch (error: any) {
      console.error("Quick Add Error:", error);
      this.toaster.showToast(error.message || "Failed to process expense statement.", "danger");
    } finally {
      this.isProcessingQuickAdd = false;
    }
  }

  async confirmAddAll(expensesToConfirm?: any[]) {
    const listToAdd = expensesToConfirm || this.parsedExpenses;
    if (listToAdd.length === 0) return;

    for (const expense of listToAdd) {
      const expenseData = {
        ...expense,
        createdAt: expense.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      this.expenseService.addExpense(expenseData);
    }
    this.toaster.showToast(`${listToAdd.length} Expenses added successfully!`, "success");
    if (!expensesToConfirm) this.parsedExpenses = [];
    this.getExpenses();
  }

  removeParsedExpense(index: number) {
    this.parsedExpenses.splice(index, 1);
  }

  clearParsedExpenses() {
    this.parsedExpenses = [];
  }

  // Toggle speech recognition on and off
  toggleSpeechRecognition() {
    if (this.isListening) {
      this.stopListening(); // Stop listening when the mic button is clicked again
    } else {
      this.startListening(); // Start listening when the mic button is clicked
    }
  }

  // Start listening to narration
  startListening() {
    this.quickAddInput = "";
    this.isListening = true;
    this.speechRecognitionService.startRecognition(
      (text: string) => {
        this.quickAddInput = text;
      },
      (error: string) => {
        this.isListening = false;
        this.toaster.showToast(`Speech Error: ${error}`, "danger");
      },
    );
  }

  // Stop listening to narration
  stopListening() {
    this.isListening = false;
    this.speechRecognitionService.stopRecognition(); // Stop speech recognition
  }

  Expenses: any = [];
  Budget: any = [];
  budgetExists = false;
  expenseSize = "week";
  expensesCount: number = 0;
  totalExpense = 0;
  dataSize = 5;
  weekBackDate: string | null = this.datePipe.transform(new CustomDate().getWeekBackDate(), "yyyy-MM-dd");
  expenseTypes = ExpenseStaticData.expenseTypes;
  spentOn = ExpenseStaticData.spentOn;
  expenseMessage: string = "Getting Last 5 Expenses :";
  expenseCurrency: string = "₹";
  showFilter: boolean = false;
  handlerMessage = "";
  roleMessage = "";

  budgetForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    month: [new CustomDate().getCurrentMonth(), [Validators.required, Validators.pattern("^[0-9-]*$")]],
    amount: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
    updatedAt: [serverTimestamp()],
  });
  budgetNote =
    "*Note : To use upcoming Analyze feature it is required to provide your income / budget ( planned / alloted amount to be spent ) for the specific month";
  ngOnInit() {
    this.seoService.seo(this.pageTitle, this.pageMetaTags);
    this.getExpenses();
    this.getBudget();
    // console.log(this.dateToday);
  }

  async getExpenses() {
    await this.expenseService.getExpenses(this.dataSize).subscribe((res: any) => {
      this.Expenses = res;
      this.expensesCount = this.Expenses.length;
      this.getTotalExpense();
    });
    this.expenseMessage = "Total of last 5 Expenses : ";
    this.expenseSize = "week";
  }
  async getAllExpenses() {
    await this.expenseService.getExpenses().subscribe((res: any) => {
      this.Expenses = res;
      this.expensesCount = this.Expenses.length;
      sessionStorage.setItem("total_expense", JSON.stringify(this.Expenses));
    });
    this.expenseSize = "all";
  }

  // Open zero expense modal via ModalController
  zeroExpenseInputs = [
    {
      type: "date",
      placeholder: "Select date",
      value: this.dateToday,
    },
  ];

  zeroExpenseButtons = [
    {
      text: "Cancel",
      role: "cancel",
    },
    {
      text: "Submit",
      role: "confirm",
      handler: (value: object) => {
        if (value) {
          // console.log("Zero expense date:", value);
          this.addZeroExpense(value[0].toString());
        } else {
          this.toaster.showToast("Submitted without selection", "danger");
        }
      },
    },
  ];

  // Update addZeroExpense to take a date parameter for zero expense
  addZeroExpense(zeroExpenseDate: string) {
    const zeroExpenseValue = {
      createdAt: serverTimestamp(),
      date: zeroExpenseDate,
      amount: 0,
      type: "saving",
      description: "Zero expense day",
      spendedOn: "self",
      reimburseable: false,
      updatedAt: serverTimestamp(),
    };
    this.expenseService.addExpense(zeroExpenseValue);
    this.seoService.eventTrigger("form", this.pageTitle);
  }

  onEditExpense(expense: ExpenseData) {
    this.router.navigate(["/expenses/edit", expense.idField]);
  }

  async deleteExpense(idField: string) {
    const response = await this.alertService.deleteAlert();
    if (response === "confirm") {
      this.expenseService.deleteExpense(idField);
    }
  }
  getTotalExpense() {
    this.totalExpense = 0;
    this.Expenses.forEach((expense: any) => {
      this.totalExpense += expense.amount;
    });
  }

  async getAllExpenseOf() {
    if (this.expenseOf !== null) {
      (await this.expenseService.getExpenseByDate(this.expenseOf)).subscribe((res: any) => {
        this.expenseByDate = res;
      });
    }
  }

  // Open filter modal using ModalController
  async openFilterModal() {
    const modal = await this.modalController.create({
      component: FilterExpenseComponent,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      // console.log("Filter data:", data);
      const filterQuery: any = {};
      // Apply date filtering: if customRange exists it takes precedence.
      if (data.customRange) {
        filterQuery.startDate = data.customRange.start;
        filterQuery.endDate = data.customRange.end;
      } else if (data.duration) {
        filterQuery.duration = data.duration;
      }
      // Attach filter option if category is spentOn or type
      if (data.filterCategory === "spentOn" || data.filterCategory === "type") {
        filterQuery.parameter = data.parameter;
      }
      // Call service method to get filtered expenses
      this.expenseService.getCustomExpenses(filterQuery).subscribe((res: any) => {
        this.Expenses = res;
        this.expensesCount = this.Expenses.length;
        this.getTotalExpense();
      });
    }
  }

  async getBudget() {
    await this.expenseService.getBudget().subscribe((res: any) => {
      this.Budget = res;
      // console.log("Budget", res);

      if (this.Budget.length > 0) {
        this.budgetExists = true;
      }
      sessionStorage.setItem("budget", JSON.stringify(this.Budget));
    });
  }
  async addBudget() {
    const month = this.budgetForm.value.month;
    let savedBudget: any;
    let monthExists: any;
    await this.getBudget()
      .then((res) => {
        const tempBudget = sessionStorage.getItem("budget");
        if (tempBudget) {
          savedBudget = JSON.parse(tempBudget);
        } else {
          alert("There was some error in adding budget. Try later or report via help section.");
        }
        monthExists = savedBudget.find((item: any) => item.month === month);
      })
      .catch((error) => {
        console.error("Error fetching budget:", error);
      });
    if (monthExists) {
      alert("This month already exists.Please use update section to verify and update.");
    } else {
      await this.expenseService.addBudget(this.budgetForm.value);
      sessionStorage.setItem("budget", JSON.stringify(this.Budget));
    }
  }
  async updateBudget() {
    const month = this.budgetForm.value.month;
    const updatedBudget = this.Budget.filter((item: any) => item.month === this.budgetForm.value.month);
    if (updatedBudget !== undefined && updatedBudget.length > 0) {
      const newBudget = updatedBudget[0];
      newBudget.amount = this.budgetForm.value.amount;
      newBudget.updatedAt = serverTimestamp();
      await this.expenseService.updateBudget(newBudget);
    } else {
      const message = `Budget for ${month} does not exist. Please add first.`;
      this.expenseService.successAlert(message);
    }
    sessionStorage.setItem("budget", JSON.stringify(this.Budget));
  }

  async analyzeExpense() {
    this.expenseService.setAnalysisData(this.Expenses);
    this.router.navigateByUrl("expenses/analyze");
  }

  // Export data
  async exportData() {
    const data: any[] = this.Expenses.map((item: any) => ({
      Date: item.date,
      Cost: item.amount,
      Description: item.description.replace(/\n/g, "\n "),
      Type: item.type,
      SpentOn: item.spendedOn,
    }));
    const categoryWiseData = await new Analyze().getCategoryWiseData(this.Expenses);
    // console.log(categoryWiseData);

    const filename = "ExpenseData" + new Date().getTime() + ".xlsx";
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const categoryData: XLSX.WorkSheet = XLSX.utils.json_to_sheet(categoryWiseData);
    const workbook: XLSX.WorkBook = {
      Sheets: {
        "Expense Data": worksheet,
        "Category wise": categoryData,
      },
      SheetNames: ["Expense Data", "Category wise"],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const excelBlob: Blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    FileSaver.saveAs(excelBlob, filename);
  }

  navigateToAnalyze() {
    // Set the current expense data for analysis
    this.expenseService.setAnalysisData(this.Expenses);
    this.router.navigate(["expenses/analyze"]);
  }
}

export interface ExamAnalysisResult {
  correct: number;
  wrong: number;
  unanswered: number;
  total: number;
  details: Array<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }>;
  correctScore?: number;
  incorrectScore?: number;
  unansweredScore?: number;
  accuracy?: string;
  fullMarks?: number;
  totalScore?: number;
}

/**
 * Compares user answers with correct answers and returns analysis report.
 * @param userAnswers Object with question number as key and selected option as value
 * @param correctAnswers Object with question number as key and correct option as value
 */
export function analyzeExamResult(
  userAnswers: { [key: string]: string },
  correctAnswers: { [key: string | number]: string },
): ExamAnalysisResult {
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;
  let details = [];
  // Defensive: ensure correctAnswers is a plain object
  let answerKeys: string[] = [];
  if (correctAnswers && typeof correctAnswers === "object") {
    answerKeys = Object.keys(correctAnswers);
  } else {
    console.error("correctAnswers is not a valid object:", correctAnswers);
  }
  const total = answerKeys.length;

  // Normalize answers to uppercase for comparison
  const normalize = (val: string) => (val || "").trim().toUpperCase();

  for (const q of answerKeys) {
    const key = q.toString();
    const userAnswer = normalize(userAnswers[key]);
    const correctAnswer = normalize(correctAnswers[key]);
    const isCorrect = !!userAnswer && userAnswer === correctAnswer;
    if (!userAnswer) {
      unanswered++;
    } else if (isCorrect) {
      correct++;
    } else {
      wrong++;
    }
    details.push({
      question: key,
      userAnswer,
      correctAnswer,
      isCorrect,
    });
  }

  return {
    correct,
    wrong,
    unanswered,
    total,
    details,
  };
}

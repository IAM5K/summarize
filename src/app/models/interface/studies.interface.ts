export interface TargetExam {
  name: string;
  duration: string;
  totalMarks: number;
  passMarks: number;
  totalQuestion: number;
  marksPerQuestion: number | string;
  hasNegativeMarking: boolean;
  negativeMarks: number;
  targetYear?: number;
  subjects: string[];
}

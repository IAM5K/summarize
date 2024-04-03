export interface TargetExam {
  examName: string;
  examShortName: string;
  duration: string;
  totalMarks: number;
  passMarks: number;
  totalQuestion: number;
  marksPerQuestion: number | string;
  hasNegativeMarking: boolean;
  negativeMarks: number;
  targetYear?: number;
  subjects: string[];
  phaseCount?:number;
  phaseName?:string;
  phases?:[]
}

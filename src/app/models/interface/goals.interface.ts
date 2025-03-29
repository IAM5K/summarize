export interface IGoalData {
  idField?: string;
  title: string;
  gTerm?: string;
  type: string;
  date: string;
  progress: number;
  reward?: string;
  resource?: string;
  description?: string;
  actionSteps?: string;
  penalty?: string;
  createdAt?: any;
  updatedAt?: any;
  completedOn?: Date;
}

export interface GoalData {
  createdAt?: { seconds: number; nanoseconds: number };
  type: string;
  gTerm: string;
  reward: string;
  progress: number;
  date: string;
  title: string;
  description: string;
  updatedAt?: { seconds: number; nanoseconds: number };
  penalty: string;
  resource: string;
  actionSteps: string;
  idField?: string;
}

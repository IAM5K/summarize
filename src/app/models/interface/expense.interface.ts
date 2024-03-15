export interface ExpenseData {
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  date: string;
  spentOn?: string;
  spendedOn: string;
  description: string;
  amount: number;
  type: string;
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
  idField?: string;
}

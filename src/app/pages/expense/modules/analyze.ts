import { Expense } from "src/app/models/interface/masterData.model";

export class Analyze {
  getCategoryWiseData(expenses: Expense[]): { type: string; amount: number }[] {
    const expenseTypes: { type: string; amount: number }[] = [];
    if (!expenses || expenses.length === 0) return [];

    const uniqueTypes = [...new Set(expenses.map((e) => e.type))];
    uniqueTypes.forEach((type) => {
      const amount = expenses.filter((e) => e.type === type).reduce((acc, curr) => acc + curr.amount, 0);
      expenseTypes.push({ type, amount });
    });
    return expenseTypes;
  }

  getSpentOnWiseData(expenses: Expense[]): { spentOn: string; amount: number }[] {
    const spentOnData: { spentOn: string; amount: number }[] = [];
    if (!expenses || expenses.length === 0) return [];

    const uniqueSpentOn = [...new Set(expenses.map((e) => e.spendedOn))];
    uniqueSpentOn.forEach((spentOn) => {
      const amount = expenses.filter((e) => e.spendedOn === spentOn).reduce((acc, curr) => acc + curr.amount, 0);
      spentOnData.push({ spentOn, amount });
    });
    return spentOnData;
  }

  getZeroExpenseDays(expenses: Expense[]): { date: string; count: number }[] {
    const zeroExpenseDays: { date: string; count: number }[] = [];
    if (!expenses || expenses.length === 0) return [];

    const savingEntries = expenses.filter((e) => e.amount === 0 && e.type === "saving");

    const uniqueDates = [...new Set(savingEntries.map((e) => e.date))];
    uniqueDates.forEach((date) => {
      const count = savingEntries.filter((e) => e.date === date).length;
      zeroExpenseDays.push({ date, count });
    });

    return zeroExpenseDays;
  }

  getTotalStats(expenses: Expense[]): {
    totalAmount: number;
    totalCount: number;
  } {
    if (!expenses || expenses.length === 0) {
      return { totalAmount: 0, totalCount: 0 };
    }

    const totalAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    return {
      totalAmount,
      totalCount: expenses.length,
    };
  }
}

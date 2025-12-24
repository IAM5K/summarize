import { Expense } from "src/app/models/interface/masterData.model";

export interface MonthlyData {
  dates: string[];
  dailyAmount: number[];
  amount: number[];
  budgetData: number[];
  incrementAmount: number;
  budgetPerDay: number[];
}

export class MonthlyExpense {
  getCurrentExpense(): number {
    return 0;
  }

  getMonthlyData(expenses: Expense[], currentBudget: number): MonthlyData {
    const dates: string[] = [];
    const amount: number[] = [];
    const dailyAmount: number[] = [];
    const budgetData: number[] = [];
    const budgetPerDay: number[] = [];
    let incrementAmount = 0;

    if (!expenses || expenses.length === 0) {
      return { dates, dailyAmount, amount, budgetData, incrementAmount, budgetPerDay };
    }

    // Get the month from first expense to calculate days in month
    const firstDate = new Date(expenses[0].date);
    const daysInMonth = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0).getDate();
    const dailyBudget = currentBudget / daysInMonth;

    expenses.forEach((data: Expense) => {
      dailyAmount.push(data.amount);
      incrementAmount += data.amount;
      amount.push(incrementAmount);
      dates.push(data.date);
      budgetData.push(currentBudget);
      budgetPerDay.push(dailyBudget);
    });

    return { dates, dailyAmount, amount, budgetData, incrementAmount, budgetPerDay };
  }

  getExpensesAfterDate(expenses: Expense[], startDate: string): Expense[] {
    return expenses.filter((expense) => expense.date >= startDate);
  }

  getMonthWiseTotalExpense(expenses: Expense[]): { month: string; total: number }[] {
    if (!expenses || expenses.length === 0) return [];

    const monthlyTotals: { [key: string]: number } = {};

    expenses.forEach((expense) => {
      const monthKey = expense.date.substring(0, 7); // Gets YYYY-MM format
      monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + expense.amount;
    });

    return Object.entries(monthlyTotals).map(([month, total]) => ({ month, total }));
  }
}

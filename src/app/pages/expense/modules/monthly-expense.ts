export class MonthlyExpense {
  // currentExpenseGraph() {}
  getCurrentExpense(): number {
    return 0;
  }
  getExpensesAfterDate(expenses: any[], firstDateOfMonth: string) {
    return expenses.filter((expense) => expense.date >= firstDateOfMonth);
  }
  getMonthlyData(expense: any[], currentBudget: number) {
    const dates: any = [];
    const amount: any = [];
    const dailyAmount: any = [];
    let incrementAmount: number = 0;
    const budgetData: any = [];
    expense.forEach((data: any, _index: number) => {
      dailyAmount.push(data.amount);
      incrementAmount += data.amount;
      amount.push(incrementAmount);
      dates.push(data.date);
      budgetData.push(currentBudget);
    });
    return { dates, dailyAmount, amount, budgetData, incrementAmount };
  }
}

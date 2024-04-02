export class TotalExpense {
  async incrementExpense(expenses: any[]) {
    const dailyExpenses: any[] = [];
    // Get unique dates from expenses array
    const uniqueDates = [...new Set(expenses.map((e) => e.date))];
    // Loop through unique dates and calculate daily expenses
    await uniqueDates.forEach((date) => {
      const dailyAmount = expenses
        .filter((e) => e.date === date)
        .reduce((acc, curr) => acc + curr.amount, 0);
      dailyExpenses.push({ date, dailyAmount });
    });
    return dailyExpenses;
  }

  getIncrementalExpenses(
    month: string,
    totalExpenses: { date: string; amount: number }[],
  ): { date: string; amount: number }[] {
    const expenses: any[] = [];
    const monthDate = new Date(month);

    // Loop through each day of the month
    for (
      let i = 1;
      i <= new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
      i++
    ) {
      const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), i)
        .toISOString()
        .substr(0, 10);
      let total = 0;

      // Loop through total expenses and add up amount spent on this day
      for (const expense of totalExpenses) {
        if (expense.date === date) {
          total += expense.amount;
        }
      }

      // Add object with date and incremental expense to expenses array
      if (i === 1) {
        expenses.push({ date, amount: total });
      } else {
        expenses.push({ date, amount: expenses[i - 2].amount + total });
      }
    }

    return expenses;
  }
}

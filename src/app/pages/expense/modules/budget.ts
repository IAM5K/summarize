export class Budget {
  async getCurrentBudget(currentMonth:string) {
    let retrievedBudget :any  = 0
    retrievedBudget = await sessionStorage.getItem('budget');
    let currentBudget: number = 0;
    if (retrievedBudget) {
      let budget = JSON.parse(retrievedBudget)
      const budgetForThisMonth = budget.find((item: any) => item.month === currentMonth);
      console.log(budgetForThisMonth);

      if(budgetForThisMonth){
        currentBudget = budgetForThisMonth.amount
      }
      else{
        alert("Budget for the current month not found. Add budget first")
      }
    }
    else{
      currentBudget=0;
      alert("There was some error getting your budget. Make sure you have added budget for this month.")
    }
    return currentBudget;
  }
  getTotalBudget(): number {
    let retrievedBudget = sessionStorage.getItem('budget');
    let currentBudget: number = 0;
    if (retrievedBudget) {
      let budget = JSON.parse(retrievedBudget)
      budget.forEach((item: any) => {
        currentBudget = currentBudget + item.amount;
      });
    }
    return currentBudget;
  }
}

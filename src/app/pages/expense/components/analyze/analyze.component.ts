import { AfterViewInit, Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions, } from 'chart.js';
import { CustomDate } from 'src/app/models/class/date/custom-date';
import { ExpenseService } from 'src/app/services/expense/expense.service';
import { BaseChartDirective, } from 'ng2-charts';
import { Router } from '@angular/router';
import { Budget } from '../../modules/budget';
import { MonthlyExpense } from '../../modules/monthly-expense';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss'],
})

export class AnalyzeComponent implements OnInit, AfterViewInit {
  @ViewChild(BaseChartDirective) chartA!: BaseChartDirective;
  @ViewChild(BaseChartDirective) chartB!: BaseChartDirective;
  // @ViewChild('monthlyChart') monthlyChart!: BaseChartDirective;
  @ViewChild('totalChart') totalChart!: BaseChartDirective;

  @Input() expenseData: any = [];
  @HostListener('window:resize')
  onResize(): void {
    this.setGraphHeight();
    this.setGraphWidth();
  }
  graphHeight: number = 400;
  graphWidth: number = 400;
  title = "Analyze Expenses"
  Expense: any = []
  dailyExpense: number[] = []
  dailyExpenseLimit: number[] = [];
  monthlyExpense: number[] = []
  monthlyExpenseLimit: number[] = [];
  totalAmount: number = 0
  totalExpense: number[] = []
  totalExpenseLimit: number[] = [];
  categoryExpense: number[] = []
  month: number = new Date().getMonth() + 1
  year = new Date().getFullYear()
  daysInMonth: number = new Date(new Date().getFullYear(), this.month, 0).getDate();
  budget = 54;
  totalBudget = 0;
  currentBudget = 0;
  currentExpense = 0;
  constructor(
    private expenseService: ExpenseService,
    private router: Router) {
  }
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: Array(this.daysInMonth).fill(this.daysInMonth).map((x, i) => x = `${i + 1}-${this.month}-${this.year}`),
    datasets: []
  };
  public totalExpenseData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Total Expense',
      fill: false,
      tension: .5,
      borderColor: 'lime',
      backgroundColor: '#00ff00'
    }]
  };
  public currentMonthExpenseData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
  public lineChartOptions: ChartOptions = {
    responsive: false,
    plugins: {}
  };
  public monthlyChartOptions: ChartOptions = {
    responsive: false,
    plugins: {}
  };
  public lineChartLegend = true;
  public monthlyChartLegend = true;

  async ngOnInit() {
    this.setGraphHeight();
    this.setGraphWidth();
    const currentMonth = new CustomDate().getCurrentMonth()
    await this.getExpense(currentMonth);
    let total_expense: any = sessionStorage.getItem("total_expense")
    let total_budget: any = sessionStorage.getItem("budget")
    if (total_expense !== undefined || total_budget !== undefined) {
      this.totalExpense = JSON.parse(total_expense);
      this.dailyExpense = await this.getDailyExpenses(this.totalExpense);
    }
    else {
      console.log("Total budget: " + total_budget);
      console.log("Total expense: " + total_expense);
      this.router.navigateByUrl("expense")
    }
    this.currentBudget = await this.getCurrentBudget(currentMonth,total_budget)
  }
  async ngAfterViewInit() {
    console.log("After Init called"+ new Date().getTime());
    // let currentMonth = await new CustomDate().getCurrentMonth()
    this.totalBudget = await new Budget().getTotalBudget()
    this.currentExpense = await new MonthlyExpense().getCurrentExpense()
  }
  async getExpense(month: string) {
    await this.expenseService.getCustomExpenses('duration', month).subscribe(async (res: any) => {
      this.Expense = await res
    })
    setTimeout(() => {
      this.updateCurrentMonthGraph(this.Expense.reverse())
      this.getTypeWiseExpense(this.Expense)
    }, 3000);

  }


  async getDailyExpenses(expenses: any[]): Promise<any[]> {
    if (expenses.length > 0) {
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
      this.updateTotalGraph(dailyExpenses)
      return dailyExpenses;
    }
    else {
      return []
    }
  }

  updateTotalGraph(expense: any[]) {
    let dates: any = [];
    let amount: any = [];
    expense.forEach((data: any, index: number) => {
      amount.push(data.dailyAmount);
      dates.push(data.date);
      this.totalAmount += data.dailyAmount;
    });
    this.totalExpenseData.labels = dates;
    this.totalExpenseData.datasets[0].data = amount;
    this.chartB.update()
  }
  async updateCurrentMonthGraph(expense: any[]) {
    let monthlyData = await new MonthlyExpense().getMonthlyData(expense, this.currentBudget)
    this.currentMonthExpenseData.labels = monthlyData.dates;
    this.currentMonthExpenseData.datasets = [
      {
        data: monthlyData.dailyAmount,
        label: 'Expense today',
        fill: false,
        tension: .5,
        borderColor: 'blue',
        backgroundColor: 'blue',
      },
      {
        data: monthlyData.amount,
        label: 'Expense till now',
        fill: false,
        tension: .5,
        borderColor: 'purple',
        backgroundColor: 'purple'
      },
      {
        data: monthlyData.budgetData,
        label: 'Monthly Budget',
        fill: false,
        tension: .5,
        borderColor: 'red',
        backgroundColor: 'red'
      }
    ]
    this.currentExpense = monthlyData.incrementAmount
    this.chartA.update()
  }
  setGraphHeight(): void {
    let screenHeight = window.innerHeight;
    if (screenHeight < 680) {
      this.graphHeight = 450;
    }
    else if (screenHeight > 680) {
      this.graphHeight = 400;
    }
    else {
      this.graphHeight = 400;
    }
  }
  setGraphWidth(): void {
    let screenWidth = window.innerWidth;
    if (screenWidth < 680) {
      this.graphWidth = 500;
    }
    else if (680 < screenWidth && screenWidth > 780) {
      this.graphWidth = screenWidth * 2 / 3;
    }
    else if (780 < screenWidth && screenWidth < 1080) {
      this.graphWidth = 1200;
    }
    else {
      this.graphWidth = screenWidth / 2;
    }
  }

  /* Pie */
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels = ['All'];
  public pieChartDatasets = [{
    data: [100]
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // /* Bar Chart */
  // public barChartLegend = true;
  // public barChartPlugins = [];

  // public barChartData: ChartConfiguration<'bar'>['data'] = {
  //   labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
  //   datasets: [
  //     {
  //       data: [65, 59, 80, 81, 56, 55, 40],
  //       label: 'Expenses',
  //       backgroundColor: 'aqua'
  //     },
  //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Budget', backgroundColor: 'orange' }
  //   ]
  // };

  // public barChartOptions: ChartConfiguration<'bar'>['options'] = {
  //   responsive: false,
  // };
  async getTypeWiseExpense(expenses: any[]) {
    if (expenses.length > 0) {
      const expenseTypes: any[] = [];
      // Get unique dates from expenses array
      const uniqueTypes = [...new Set(expenses.map((e) => e.type))];
      // Loop through unique dates and calculate daily expenses
      await uniqueTypes.forEach((type) => {
        const amount = expenses
          .filter((e) => e.type === type)
          .reduce((acc, curr) => acc + curr.amount, 0);
        expenseTypes.push({ type, amount });
      })
      this.updateTypeWisePie(expenseTypes)
      return expenseTypes;
    }
    else {
      return []
    }

  }

  updateTypeWisePie(expenses: any) {
    this.pieChartLabels = []
    this.pieChartDatasets[0].data = []
    expenses.forEach((data: any) => {
      this.pieChartLabels.push(data.type.toUpperCase())
      this.pieChartDatasets[0].data.push(data.amount)
    });

  }

  /**External Functions */
  async getCurrentBudget(currentMonth:string,budget:any):Promise<number> {

    console.log(currentMonth+"After called"+ new Date().getTime());
    let retrievedBudget :any  = 0
    retrievedBudget = budget;
    let currentBudget: number = 0;
    if (retrievedBudget) {
      let budget = JSON.parse(retrievedBudget)
      const budgetForThisMonth = budget.find((item: any) => item.month === currentMonth);
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
}

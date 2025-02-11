import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ChartConfiguration, ChartOptions } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { Router } from "@angular/router";
import { Budget } from "../../modules/budget";
import { MonthlyExpense } from "../../modules/monthly-expense";
import { Analyze } from "../../modules/analyze";
import { ToasterService } from "src/app/services/toaster/toaster.service";
import { Expense } from "src/app/models/interface/masterData.model";
import { FilterExpenseComponent } from "../../components/filter-expense/filter-expense.component";
import { ModalController } from "@ionic/angular";
import { Chart, registerables } from "chart.js";
import { Subscription } from "rxjs";
import { ExpenseService } from "src/app/services/expense/expense.service";
Chart.register(...registerables);

@Component({
  selector: "app-analyze",
  templateUrl: "./analyze.component.html",
  styleUrls: ["./analyze.component.scss"],
})
export class AnalyzeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild("lineChart") lineChart?: BaseChartDirective;
  @ViewChild("pieChart") pieChart?: BaseChartDirective;
  @ViewChild("doughnutChart") doughnutChart?: BaseChartDirective;
  @ViewChild("barChart") barChart?: BaseChartDirective;

  private chartInitialized = false;

  private subscription = new Subscription();
  title = "Analyze Expenses";
  expenseData: Expense[] = [];
  protected readonly Math = Math; // Add Math to template

  // Analysis data
  totalStats: { totalAmount: number; totalCount: number } = { totalAmount: 0, totalCount: 0 };
  categoryData: { type: string; amount: number }[] = [];
  spentOnData: { spentOn: string; amount: number }[] = [];
  zeroExpenseDays: number = 0;
  monthlyData: any;

  // Budget info
  totalAmount: number = 0;
  totalBudget: number = 0;
  currentBudget: number = 0;
  remainingBalance: number = 0;

  // Line chart configuration for monthly expense comparison
  lineChartConfig: ChartConfiguration = {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          label: "Daily Expense",
          borderColor: "#3880ff",
          backgroundColor: "rgba(56, 128, 255, 0.1)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        },
        {
          data: [],
          label: "Cumulative Expense",
          borderColor: "#eb445a",
          backgroundColor: "rgba(235, 68, 90, 0.1)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        },
        {
          data: [],
          label: "Budget Line",
          borderColor: "#2dd36f",
          backgroundColor: "rgba(45, 211, 111, 0.1)",
          borderWidth: 2,
          tension: 0,
          borderDash: [5, 5],
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Monthly Expense Trend",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Amount (₹)",
          },
        },
        x: {
          title: {
            display: true,
            text: "Date",
          },
        },
      },
    },
  };

  // Pie chart configuration
  pieChartConfig: ChartConfiguration = {
    type: "pie",
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: ["#3880ff", "#eb445a", "#2dd36f", "#ffc409", "#92949c", "#5260ff"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Expense by Type",
        },
      },
    },
  };

  // Doughnut chart configuration
  doughnutChartConfig: ChartConfiguration = {
    type: "doughnut",
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: ["#3880ff", "#eb445a", "#2dd36f", "#ffc409", "#92949c", "#5260ff"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Expense by Category",
        },
      },
    },
  };

  // Bar chart configuration
  barChartConfig: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: ['Zero Expense Days'],
      datasets: [{
        data: [0], // Will be updated with actual count
        label: 'Count',
        backgroundColor: '#3880ff',
        borderColor: '#3880ff',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // Hide legend since we only have one value
        },
        title: {
          display: true,
          text: 'Zero Expense Days'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Count'
          }
        }
      }
    }
  };

  private chartStates = {
    line: false,
    pie: false,
    doughnut: false,
    bar: false,
  };

  private initializeChart(chart: BaseChartDirective | undefined, type: keyof typeof this.chartStates): boolean {
    if (!chart || !this.chartInitialized) return false;
    this.chartStates[type] = true;
    return true;
  }

  constructor(
    private expenseService: ExpenseService,
    private router: Router,
    private toaster: ToasterService,
    private modalController: ModalController,
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.expenseService.analysisData$.subscribe((data) => {
        if (!data || data.length === 0) {
          this.toaster.showToast("No expense data found, redirecting to Expense page", "warning");
          this.router.navigateByUrl("expenses");
          return;
        }
        this.expenseData = data;
        if (this.chartInitialized) {
          this.analyzeData();
        }
      }),
    );
  }

  ngAfterViewInit() {
    // Wait for charts to be available
    setTimeout(() => {
      this.chartInitialized = true;
      if (this.expenseData.length > 0) {
        this.analyzeData();
      }
    }, 500); // Increased delay to ensure DOM is ready
  }

  async analyzeData() {
    if (!this.chartInitialized) return;

    try {
      const analyzer = new Analyze();
      const monthlyExpense = new MonthlyExpense();
      const budgetHelper = new Budget();

      // Get total stats for selected duration
      this.totalStats = analyzer.getTotalStats(this.expenseData);
      this.totalAmount = this.totalStats.totalAmount;

      // Count zero expense days (where amount = 0 and type = saving)
      this.zeroExpenseDays = this.expenseData.filter(
        (expense) => expense.amount === 0 && expense.type === "saving",
      ).length;

      // Calculate budget for the selected duration
      let startDate = this.expenseData[this.expenseData.length - 1]?.date;
      let endDate = this.expenseData[0]?.date;

      if (startDate && endDate) {
        // Convert dates to proper format
        const start = new Date(startDate);
        const end = new Date(endDate);

        let totalBudget = 0;
        let currentDate = start;

        while (currentDate <= end) {
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1;
          const daysInMonth = new Date(year, month, 0).getDate();

          // Get budget for current month
          const monthBudget = await budgetHelper.getCurrentBudget(`${year}-${month.toString().padStart(2, "0")}`);

          if (currentDate.getMonth() === start.getMonth() && currentDate.getMonth() === end.getMonth()) {
            // Same month - calculate for specific days
            const dayCount = end.getDate() - start.getDate() + 1;
            totalBudget += (monthBudget / daysInMonth) * dayCount;
          } else if (currentDate.getMonth() === start.getMonth()) {
            // First month - calculate remaining days
            const dayCount = daysInMonth - start.getDate() + 1;
            totalBudget += (monthBudget / daysInMonth) * dayCount;
          } else if (currentDate.getMonth() === end.getMonth()) {
            // Last month - calculate days until end
            totalBudget += (monthBudget / daysInMonth) * end.getDate();
          } else {
            // Full month
            totalBudget += monthBudget;
          }

          // Move to next month
          currentDate.setMonth(currentDate.getMonth() + 1);
        }

        this.totalBudget = Math.round(totalBudget);
        this.remainingBalance = this.totalBudget - this.totalAmount;
      }

      // Get category wise data
      this.categoryData = analyzer.getCategoryWiseData(this.expenseData);
      setTimeout(() => this.updatePieChart(), 100);

      // Get spent on data
      this.spentOnData = analyzer.getSpentOnWiseData(this.expenseData);
      setTimeout(() => this.updateDoughnutChart(), 200);

      // Get monthly analysis
      this.monthlyData = monthlyExpense.getMonthlyData(this.expenseData, this.totalBudget);
      setTimeout(() => this.updateLineChart(), 300);
      setTimeout(() => this.updateBarChart(), 400);
    } catch (error) {
      console.error("Error analyzing data:", error);
      this.toaster.showToast("Error analyzing expense data", "danger");
      this.router.navigateByUrl("expenses");
    }
  }

  // Chart update methods
  updateLineChart() {
    if (!this.monthlyData || !this.initializeChart(this.lineChart, "line")) return;

    try {
      this.lineChartConfig.data.labels = this.monthlyData.dates;
      this.lineChartConfig.data.datasets[0].data = this.monthlyData.dailyAmount;
      this.lineChartConfig.data.datasets[1].data = this.monthlyData.amount;
      this.lineChartConfig.data.datasets[2].data = Array(this.monthlyData.dates.length).fill(this.currentBudget);
      this.lineChartConfig.data.datasets[3].data = Array(this.monthlyData.dates.length).fill(
        this.currentBudget / this.monthlyData.dates.length,
      );

      requestAnimationFrame(() => {
        this.lineChart?.render();
      });
    } catch (error) {
      console.error("Error updating line chart:", error);
    }
  }

  updatePieChart() {
    if (!this.categoryData || !this.initializeChart(this.pieChart, "pie")) return;

    try {
      this.pieChartConfig.data.labels = this.categoryData.map((item) => item.type);
      this.pieChartConfig.data.datasets[0].data = this.categoryData.map((item) => item.amount);

      requestAnimationFrame(() => {
        this.pieChart?.render();
      });
    } catch (error) {
      console.error("Error updating pie chart:", error);
    }
  }

  updateDoughnutChart() {
    if (!this.spentOnData || !this.initializeChart(this.doughnutChart, "doughnut")) return;

    try {
      this.doughnutChartConfig.data.labels = this.spentOnData.map((item) => item.spentOn);
      this.doughnutChartConfig.data.datasets[0].data = this.spentOnData.map((item) => item.amount);

      requestAnimationFrame(() => {
        this.doughnutChart?.render();
      });
    } catch (error) {
      console.error("Error updating doughnut chart:", error);
    }
  }

  updateBarChart() {
    if (this.initializeChart(this.barChart, 'bar')) {
      this.barChartConfig.data.datasets[0].data = [this.zeroExpenseDays];
      this.barChart?.update();
    }
  }

  // Shared chart options
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Expense Analysis",
      },
    },
  };

  async openFilterModal() {
    try {
      const modal = await this.modalController.create({
        component: FilterExpenseComponent,
      });
      await modal.present();

      const { data } = await modal.onDidDismiss();
      if (data) {
        this.expenseService.getCustomExpenses(data).subscribe({
          next: (expenses: Expense[]) => {
            this.expenseData = expenses;
            this.analyzeData();
          },
          error: (error) => {
            console.error("Error getting filtered expenses:", error);
            this.toaster.showToast("Error getting filtered expenses", "danger");
          },
        });
      }
    } catch (error) {
      console.error("Error with filter modal:", error);
      this.toaster.showToast("Error opening filter", "danger");
    }
  }

  ngOnDestroy() {
    this.chartInitialized = false;
    this.subscription.unsubscribe();
    this.expenseService.clearAnalysisData();
  }
}

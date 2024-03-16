import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { CustomDate } from "src/app/models/class/date/custom-date";
import { serverTimestamp } from "@angular/fire/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExpenseService } from "src/app/services/expense/expense.service";
import { SeoService } from "src/app/services/seo/seo.service";
import { Expense, Options } from "src/app/models/interface/masterData.model";
import { AlertService } from "src/app/services/alert/alert.service";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { Analyze } from "./modules/analyze";
import { PopoverController } from "@ionic/angular";
import { SeoTags } from "src/app/models/class/seoTags/seo";
import { ExpenseData } from "src/app/models/interface/expense.interface";
@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.page.html",
  styleUrls: ["./expenses.page.scss"],
})
export class ExpensesPage implements OnInit {
  @Output() expenseData = new EventEmitter<any>();
  pageTitle = "Expenses";
  pageMetaTags = SeoTags.expensePageTags;
  editMode: boolean = false;
  updateSubmitted = false;
  editExpenseData: any;
  dateToday: string | null = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  expenseOf: string = this.dateToday;
  expenseByDate: any;
  constructor(
    private fb: FormBuilder,
    private seoService: SeoService,
    private expenseService: ExpenseService,
    private alertService: AlertService,
    private datePipe: DatePipe,
    public popoverController: PopoverController,
    private router: Router
  ) {}
  Expenses: any = [];
  Budget: any = [];
  budgetExists = false;
  expenseSize = "week";
  expensesCount: number = 0;
  totalExpense = 0;
  dataSize = 5;
  weekBackDate: string | null = this.datePipe.transform(
    new CustomDate().getWeekBackDate(),
    "yyyy-MM-dd"
  );
  expenseTypes = [
    { title: "Bills", value: "bill" },
    { title: "Emi", value: "emi" },
    { title: "Education", value: "education" },
    { title: "Entertainment", value: "entertainment" },
    { title: "Food", value: "food" },
    { title: "Groceries", value: "grocery" },
    { title: "Health", value: "health" },
    { title: "Home Utilities", value: "utilities" },
    { title: "Insurance", value: "insurance" },
    { title: "Investment", value: "investment" },
    { title: "Personal care", value: "personal care" },
    { title: "Refreshments", value: "refreshments" },
    { title: "Rent", value: "rent" },
    { title: "Saving", value: "saving" },
    { title: "Shopping", value: "shopping" },
    { title: "Transportation", value: "transportation" },
    { title: "Travel", value: "travel" },
    { title: "Donate", value: "donated" },
    { title: "Miscellaneous", value: "miscellaneous" },
  ];
  spentOn = [
    { value: "self", title: "Self" },
    { value: "group", title: "Group" },
    { value: "family", title: "Family" },
  ];
  filterType: string = "duration";
  filterParams: any = "";
  filterDuration: any = this.weekBackDate;
  durationFilter: Options[] = [
    // { title: "5 Recent", value: "recent" },
    { title: "Today", value: this.dateToday },
    { title: "7 Days", value: this.weekBackDate },
    {
      title: "30 Days",
      value: this.datePipe.transform(new CustomDate().getLastMonthDate(), "yyyy-MM-dd"),
    },
    {
      title: "365 Days",
      value: this.datePipe.transform(new CustomDate().getLastYearDate(), "yyyy-MM-dd"),
    },
    { title: "This Month", value: new CustomDate().getThisMonth() },
    { title: "This Year", value: new CustomDate().getThisYear() },
  ];
  expenseMessage: string = "Getting Last 5 Expenses :";
  expenseCurrency: string = "₹";
  showFilter: boolean = false;
  handlerMessage = "";
  roleMessage = "";
  expenseForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    date: [this.dateToday, [Validators.required, Validators.pattern("^[a-zA-Z 0-9 .,-]*$")]],
    amount: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
    type: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]*$")]],
    description: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9\n, -.]*$")]],
    spendedOn: ["self", [Validators.required, Validators.pattern("^[a-zA-Z 0-9 .,-]*$")]],
    updatedAt: [serverTimestamp()],
  });
  budgetForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    month: [
      new CustomDate().getCurrentMonth(),
      [Validators.required, Validators.pattern("^[0-9-]*$")],
    ],
    amount: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
    updatedAt: [serverTimestamp()],
  });

  ngOnInit() {
    this.seoService.seo(this.pageTitle, this.pageMetaTags);
    this.getExpenses();
  }

  async getExpenses() {
    await this.expenseService.getExpenses(this.dataSize).subscribe((res: any) => {
      this.Expenses = res;
      this.expensesCount = this.Expenses.length;
      this.getTotalExpense();
    });
    this.expenseMessage = "Total of last 5 Expenses : ";
    this.expenseSize = "week";
  }
  async getAllExpenses() {
    await this.expenseService.getExpenses().subscribe((res: any) => {
      this.Expenses = res;
      this.expensesCount = this.Expenses.length;
      sessionStorage.setItem("total_expense", JSON.stringify(this.Expenses));
    });
    this.expenseSize = "all";
  }

  addExpense() {
    this.expenseService.addExpense(this.expenseForm.value);
    this.expenseForm.patchValue({
      amount: "",
      description: "",
    });
    this.seoService.eventTrigger("form", this.pageTitle);
  }

  editExpense(expense: ExpenseData) {
    console.log("Edit expense called");

    this.editMode = true;
    this.editExpenseData = expense;
    this.expenseForm.patchValue({
      createdAt: expense.createdAt,
      date: expense.date,
      amount: expense.amount,
      type: expense.type,
      description: expense.description,
      spendedOn: expense.spendedOn,
    });
  }

  async updateExpense() {
    this.updateSubmitted = true;
    const response = await this.expenseService.updateExpense(
      this.expenseForm.value,
      this.editExpenseData.idField
    );
    if (response) {
      this.cancelUpdate();
    } else {
      this.updateSubmitted = false;
    }
  }

  cancelUpdate() {
    this.editMode = false;
    this.expenseForm.markAsUntouched();
    this.updateSubmitted = false;
    setTimeout(() => {
      this.backToDefault();
    }, 100);
  }
  
  async backToDefault() {
    this.expenseForm.reset({
      createdAt: serverTimestamp(),
      date: this.dateToday.toString(),
      spendedOn: "self",
      amount: 0,
      type: "",
      description: "",
    });

  }

  onDeleteExpense(expenseItem: any) {
    console.log("Delete expense:", expenseItem);
    // Your delete expense logic here
  }
  async deleteExpense(idField: string) {
    console.log("Delete function called");

    const response = await this.alertService.deleteAlert();
    if (response === "confirm") {
      this.expenseService.deleteExpense(idField);
    }
  }
  getTotalExpense() {
    this.totalExpense = 0;
    this.Expenses.forEach((expense: any) => {
      this.totalExpense += expense.amount;
    });
  }

  async getAllExpenseOf() {
    if (this.expenseOf !== null) {
      (await this.expenseService.getExpenseByDate(this.expenseOf)).subscribe((res: any) => {
        this.expenseByDate = res;
      });
    }
  }

  filterBy() {
    switch (this.filterType) {
      case "duration":
        this.filterParams = this.weekBackDate;
        break;

      case "spentOn":
        this.filterParams = "self";
        break;

      case "type":
        this.filterParams = "food";
        break;

      default:
        this.filterType = "duration";
        this.filterParams = "week";
        break;
    }
  }
  async filter() {
    switch (this.filterType) {
      case "duration":
        this.expenseMessage = "Total Expenses since " + this.filterParams + " : ";
        break;
      case "spentOn":
        this.expenseMessage =
          "Total Expenses on " + this.filterParams + " since " + this.filterDuration + " : ";
        break;
      case "type":
        this.expenseMessage =
          "Total Expenses for " + this.filterParams + " since " + this.filterDuration + " : ";
        break;
      default:
        this.expenseMessage = "No Expenses found for " + this.filterParams + " : ";
        break;
    }
    this.Expenses = [];
    await this.expenseService
      .getCustomExpenses(this.filterType, this.filterParams, this.filterDuration)
      .subscribe((res: any) => {
        this.Expenses = res;
        this.expensesCount = this.Expenses.length;
        this.getTotalExpense();
      });
  }

  async getBudget() {
    await this.expenseService.getBudget().subscribe((res: any) => {
      this.Budget = res;
      if (this.Budget.length > 0) {
        this.budgetExists = true;
      }
      sessionStorage.setItem("budget", JSON.stringify(this.Budget));
    });
  }
  async addBudget() {
    const month = this.budgetForm.value.month;
    let savedBudget: any;
    let monthExists: any;
    await this.getBudget().then((res) => {
      let tempBudget = sessionStorage.getItem("budget");
      if (tempBudget) {
        savedBudget = JSON.parse(tempBudget);
      } else {
        alert("There was some error in adding budget. Try later or report via help section.");
      }
      monthExists = savedBudget.find((item: any) => item.month === month);
    });
    if (monthExists) {
      alert("This month already exists.Please use update section to verify and update.");
    } else {
      await this.expenseService.addBudget(this.budgetForm.value);
      sessionStorage.setItem("budget", JSON.stringify(this.Budget));
    }
  }
  async updateBudget() {
    const month = this.budgetForm.value.month;
    const updatedBudget = this.Budget.filter(
      (item: any) => item.month === this.budgetForm.value.month
    );
    if (updatedBudget !== undefined && updatedBudget.length > 0) {
      const newBudget = updatedBudget[0];
      newBudget.amount = this.budgetForm.value.amount;
      newBudget.updatedAt = serverTimestamp();
      await this.expenseService.updateBudget(newBudget);
    } else {
      const message = `Budget for ${month} does not exist. Please add first.`;
      this.expenseService.successAlert(message);
    }
    sessionStorage.setItem("budget", JSON.stringify(this.Budget));
  }

  async analyzeExpense() {
    this.expenseService.analyzeExpense = this.Expenses;
    // this.getAllExpenses();
    // await this.getBudget();
    this.router.navigateByUrl("expenses/analyze");
  }

  // Export data
  async exportData() {
    const data: any[] = this.Expenses.map((item: any) => ({
      Date: item.date,
      Cost: item.amount,
      Description: item.description.replace(/\n/g, "\n "),
      Type: item.type,
      SpentOn: item.spendedOn,
    }));
    const categoryWiseData = await new Analyze().getCategoryWiseData(this.Expenses);
    // console.log(categoryWiseData);

    const filename = "ExpenseData" + new Date().getTime() + ".xlsx";
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const categoryData: XLSX.WorkSheet = XLSX.utils.json_to_sheet(categoryWiseData);
    const workbook: XLSX.WorkBook = {
      Sheets: {
        "Expense Data": worksheet,
        "Category wise": categoryData,
      },
      SheetNames: ["Expense Data", "Category wise"],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const excelBlob: Blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    FileSaver.saveAs(excelBlob, filename);
  }
}

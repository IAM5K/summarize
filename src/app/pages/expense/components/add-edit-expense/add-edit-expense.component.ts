import { Component, OnInit, signal, inject } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ExpenseService } from "src/app/services/expense/expense.service";
import { SeoService } from "src/app/services/seo/seo.service";
import { ExpenseStaticData } from "src/app/models/class/static/expense/expense-data";
import { serverTimestamp } from "@angular/fire/firestore";

@Component({
  selector: "app-add-edit-expense",
  templateUrl: "./add-edit-expense.component.html",
  styleUrls: ["./add-edit-expense.component.scss"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  providers: [DatePipe],
})
export class AddEditExpenseComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private expenseService = inject(ExpenseService);
  private seoService = inject(SeoService);
  private datePipe = inject(DatePipe);

  editMode = signal(false);
  updateSubmitted = signal(false);
  expenseId = signal<string | null>(null);

  dateToday = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  expenseTypes = ExpenseStaticData.expenseTypes;
  spentOn = ExpenseStaticData.spentOn;

  expenseForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    date: [this.dateToday, [Validators.required]],
    amount: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
    type: ["", [Validators.required]],
    description: ["", [Validators.required]],
    spendedOn: ["self", [Validators.required]],
    reimburseable: [false],
    updatedAt: [serverTimestamp()],
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.editMode.set(true);
      this.expenseId.set(id);
      this.loadExpense(id);
      this.seoService.seo("Update Expense", []);
    } else {
      this.seoService.seo("Add Expense", []);
    }
  }

  loadExpense(id: string) {
    this.expenseService.getExpenseById(id).subscribe((expense: any) => {
      if (expense) {
        this.expenseForm.patchValue({
          createdAt: expense.createdAt,
          date: expense.date,
          amount: expense.amount,
          type: expense.type,
          description: expense.description,
          spendedOn: expense.spendedOn,
          reimburseable: expense?.reimburseable || false,
        });
      }
    });
  }

  async onSubmit() {
    if (this.expenseForm.invalid) {
      return;
    }

    if (this.editMode()) {
      await this.updateExpense();
    } else {
      this.addExpense();
    }
  }

  addExpense() {
    this.expenseService.addExpense(this.expenseForm.value);
    this.router.navigate(["/expenses"]);
  }

  async updateExpense() {
    this.updateSubmitted.set(true);
    const id = this.expenseId();
    if (id) {
      const response = await this.expenseService.updateExpense(this.expenseForm.value, id);
      if (response) {
        this.router.navigate(["/expenses"]);
      } else {
        this.updateSubmitted.set(false);
      }
    }
  }

  cancel() {
    this.router.navigate(["/expenses"]);
  }
}

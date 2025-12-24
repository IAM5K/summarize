import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ExpensesPageRoutingModule } from "./expenses-routing.module";
import { ExpensesPage } from "./expenses.page";
import { ExpenseCardComponent } from "./components/expense-card/expense-card.component";
import { FilterExpenseComponent } from "./components/filter-expense/filter-expense.component";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ExpensesPageRoutingModule, ReactiveFormsModule],
  providers: [],
  declarations: [ExpensesPage, ExpenseCardComponent, FilterExpenseComponent, ShoppingListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExpensesPageModule {}

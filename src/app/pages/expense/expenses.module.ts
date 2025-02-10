import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ExpensesPageRoutingModule } from "./expenses-routing.module";

import { ExpensesPage } from "./expenses.page";
import { AnalyzeComponent } from "./components/analyze/analyze.component";
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from "ng2-charts";
import { ExpenseCardComponent } from "./components/expense-card/expense-card.component";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";
import { FilterExpenseComponent } from "./components/filter-expense/filter-expense.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ExpensesPageRoutingModule, ReactiveFormsModule, BaseChartDirective],
  declarations: [ExpensesPage, AnalyzeComponent, ExpenseCardComponent, ShoppingListComponent, FilterExpenseComponent],
  providers: [DatePipe, provideCharts(withDefaultRegisterables())],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExpensesPageModule {}

import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ExpensesPageRoutingModule } from "./expenses-routing.module";

import { ExpensesPage } from "./expenses.page";
import { AnalyzeComponent } from "./components/analyze/analyze.component";
import { NgChartsModule } from "ng2-charts";
import { ExpenseCardComponent } from "./components/expense-card/expense-card.component";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensesPageRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
  ],
  declarations: [ExpensesPage, AnalyzeComponent, ExpenseCardComponent, ShoppingListComponent],
  providers: [DatePipe],
})
export class ExpensesPageModule {}

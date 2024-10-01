import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AnalyzeComponent } from "./components/analyze/analyze.component";

import { ExpensesPage } from "./expenses.page";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";

const routes: Routes = [
  {
    path: "",
    component: ExpensesPage,
  },
  {
    path: "analyze",
    component: AnalyzeComponent,
  },
  {
    path: "shopping-list",
    component: ShoppingListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensesPageRoutingModule {}

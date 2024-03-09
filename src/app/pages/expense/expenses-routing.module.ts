import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AnalyzeComponent } from "./components/analyze/analyze.component";

import { ExpensesPage } from "./expenses.page";

const routes: Routes = [
  {
    path: "",
    component: ExpensesPage
  },
  {
    path: "analyze",
    component: AnalyzeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensesPageRoutingModule {}

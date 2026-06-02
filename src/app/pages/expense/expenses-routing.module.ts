import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExpensesPage } from "./expenses.page";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";

const routes: Routes = [
  {
    path: "",
    component: ExpensesPage,
  },
  {
    path: "add",
    loadComponent: () =>
      import("./components/add-edit-expense/add-edit-expense.component").then((m) => m.AddEditExpenseComponent),
  },
  {
    path: "edit/:id",
    loadComponent: () =>
      import("./components/add-edit-expense/add-edit-expense.component").then((m) => m.AddEditExpenseComponent),
  },
  {
    path: "analyze",
    loadChildren: () => import("./components/analyze/analyze.module").then((m) => m.AnalyzeModule),
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("./components/shopping-list/shopping-list.component").then((m) => m.ShoppingListComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensesPageRoutingModule {}

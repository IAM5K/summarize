import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GoalPage } from "./goal.page";
import { GoalInfoComponent } from "./components/goal-info/goal-info.component";

const routes: Routes = [
  {
    path: "",
    component: GoalPage,
  },
  {
    path: "info",
    component: GoalInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalPageRoutingModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { GoalPageRoutingModule } from "./goal-routing.module";

import { GoalPage } from "./goal.page";
import { GoalInfoComponent } from "./components/goal-info/goal-info.component";
import { QuickGoalModalComponent } from "./components/quick-goal-modal/quick-goal-modal.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, GoalPageRoutingModule, ReactiveFormsModule],
  declarations: [GoalPage, GoalInfoComponent, QuickGoalModalComponent],
})
export class GoalPageModule {}

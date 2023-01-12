import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AchievementPage } from './achievement.page';
import { CreateGoalComponent } from './create-goal/create-goal.component';

const routes: Routes = [
  {
    path: '',
    component: AchievementPage
  },
  {
    path: 'create-goal',
    component: CreateGoalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AchievementPageRoutingModule {}

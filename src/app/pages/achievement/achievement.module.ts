import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AchievementPageRoutingModule } from './achievement-routing.module';

import { AchievementPage } from './achievement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AchievementPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AchievementPage]
})
export class AchievementPageModule {}

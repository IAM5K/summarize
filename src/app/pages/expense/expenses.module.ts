import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpensesPageRoutingModule } from './expenses-routing.module';

import { ExpensesPage } from './expenses.page';
import { AnalyzeComponent } from './components/analyze/analyze.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ExpensesPage,
    AnalyzeComponent
  ],
  providers:[DatePipe]
})
export class ExpensesPageModule {}

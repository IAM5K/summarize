import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudiesPageRoutingModule } from './studies-routing.module';

import { StudiesPage } from './studies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudiesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [StudiesPage]
})
export class StudiesPageModule {}

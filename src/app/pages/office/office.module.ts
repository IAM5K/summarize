import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfficePageRoutingModule } from './office-routing.module';

import { OfficePage } from './office.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfficePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OfficePage]
})
export class OfficePageModule {}

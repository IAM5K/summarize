import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HelpPageRoutingModule } from "./help-routing.module";

import { HelpPage } from "./help.page";
import { FaqComponent } from "./faq/faq.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [HelpPage,FaqComponent]
})
export class HelpPageModule {}

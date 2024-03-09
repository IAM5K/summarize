import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AboutPageRoutingModule } from "./about-routing.module";

import { AboutPage } from "./about.page";
import { HowtoComponent } from "./components/howto/howto.component";
import { UpdateComponent } from "./components/update/update.component";
import { HofComponent } from "./components/hof/hof.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutPageRoutingModule
  ],
  declarations: [
    AboutPage,
    HowtoComponent,
    UpdateComponent,
    HofComponent
  ]
})
export class AboutPageModule {}

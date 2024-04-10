import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { StudiesPageRoutingModule } from "./studies-routing.module";
import { StudiesPage } from "./studies.page";
import { TwelveHourFormatPipeModule } from "src/app/models/pipe/time/twelve-hour-format.module";
import { EditStudiesComponent } from "./components/edit-studies/edit-studies.component";
import { FreeResourceComponent } from "./components/free-resource/free-resource.component";
import { AdvancedStudiesComponent } from "./components/advanced-studies/advanced-studies.component";
import { SharedModule } from "src/app/shared/module/shared-module/shared-module.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudiesPageRoutingModule,
    ReactiveFormsModule,
    TwelveHourFormatPipeModule,
    SharedModule,
  ],
  declarations: [StudiesPage, EditStudiesComponent, FreeResourceComponent, AdvancedStudiesComponent],
})
export class StudiesPageModule {}

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from "ng2-charts";
import { AnalyzeComponent } from "./analyze.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/module/shared-module/shared-module.module";

const routes: Routes = [
  {
    path: "",
    component: AnalyzeComponent,
  },
];

@NgModule({
  declarations: [AnalyzeComponent],
  imports: [CommonModule, IonicModule, FormsModule, RouterModule.forChild(routes), BaseChartDirective, SharedModule],
  providers: [DatePipe, provideCharts(withDefaultRegisterables())],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AnalyzeModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HomePageRoutingModule } from "./home-routing.module";

import { HomePage } from "./home.page";
import { GoalOnDashboardComponent } from "./components/goal-on-dashboard/goal-on-dashboard.component";
import { QuickFeaturesComponent } from "./components/quick-features/quick-features.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [HomePage, GoalOnDashboardComponent, QuickFeaturesComponent],
})
export class HomePageModule {}

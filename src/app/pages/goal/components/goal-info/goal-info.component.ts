import { Component } from "@angular/core";
import { GoalData } from "src/app/models/class/static/goal";
import { DataDescription } from "src/app/models/interface/masterData.model";

@Component({
  selector: "app-goal-info",
  templateUrl: "./goal-info.component.html",
  styleUrls: ["./goal-info.component.scss"],
})
export class GoalInfoComponent {
  title: string = "Goal Setting";
  goalSetting: DataDescription[] = GoalData.goalSetting;
  goalDetails: DataDescription[] = GoalData.goalDetails;
}

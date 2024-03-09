import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { serverTimestamp } from "@angular/fire/firestore";
import { FormBuilder, FormGroup } from "@angular/forms";
import { GoalData } from "src/app/models/interface/goals.interface";
import { FirebaseService } from "src/app/services/firebase/firebase.service";
import { GoalService } from "src/app/services/goal/goal.service";
import { ToasterService } from "src/app/services/toaster/toaster.service";

@Component({
  selector: "app-goal-on-dashboard",
  templateUrl: "./goal-on-dashboard.component.html",
  styleUrls: ["./goal-on-dashboard.component.scss"],
})
export class GoalOnDashboardComponent implements OnInit {
  dailyGoals: GoalData[];
  priorityGoals: GoalData[];
  alertButtons = ["Close"];
  goalForm: FormGroup;
  dateToday: string | null = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  constructor(
    private firebaseService: FirebaseService,
    private fb: FormBuilder,
    private goalService: GoalService,
    private toasterService:ToasterService,
    private datePipe: DatePipe
  ) {
    this.goalForm = this.fb.group({
      updatedAt: [serverTimestamp()],
    });
  }

  ngOnInit() {
    this.getGoal();
  }

  async getGoal() {
    const userProfile = await this.firebaseService.getUserProfile();
    if (userProfile) {
      this.goalService.getDailyGoal().subscribe((res: any) => {
        this.dailyGoals = res;
      });
      this.goalService.getPriorityGoal().subscribe((res: any) => {
        this.priorityGoals = res;
      });
    } else {
      this.toasterService.showToast("No goals found : User not logged in.","warning")
    }
  }

  updateDailyTask(checked: boolean, item: GoalData) {
    item.progress = checked ? 100 : 0;
    item.updatedAt = this.goalForm.value.updatedAt;
    // console.log(item);
    this.goalService.updateDailyGoal(item, item.idField);
  }

  updatePriorityTask(checked: boolean, item: GoalData) {
    item.progress = checked ? 100 : 0;
    item.updatedAt = this.goalForm.value.updatedAt;
    // console.log(item);
    this.goalService.updateGoal(item, item.idField);
  }
}

import { ModalController } from "@ionic/angular";
import { QuickGoalModalComponent } from "../../../goal/components/quick-goal-modal/quick-goal-modal.component";
import { DatePipe } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { serverTimestamp } from "@angular/fire/firestore";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IGoalData } from "src/app/models/interface/goals.interface";
import { FirebaseService } from "src/app/services/firebase/firebase.service";
import { GoalService } from "src/app/services/goal/goal.service";
import { ToasterService } from "src/app/services/toaster/toaster.service";

@Component({
    selector: "app-goal-on-dashboard",
    templateUrl: "./goal-on-dashboard.component.html",
    styleUrls: ["./goal-on-dashboard.component.scss"],
    standalone: false
})
export class GoalOnDashboardComponent implements OnInit {
  dailyGoals: IGoalData[];
  priorityGoals: IGoalData[];
  alertButtons = ["Close"];
  goalForm: FormGroup;
  dateToday: string | null = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  isLargeScreen: boolean = false;
  constructor(
    private firebaseService: FirebaseService,
    private fb: FormBuilder,
    private goalService: GoalService,
    private toasterService: ToasterService,
    private datePipe: DatePipe,
    private modalController: ModalController,
  ) {
    this.goalForm = this.fb.group({
      updatedAt: [serverTimestamp()],
    });
  }

  ngOnInit() {
    this.getGoal();
    this.checkScreenSize(window.innerWidth);
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.checkScreenSize(event.target.innerWidth);
  }

  private checkScreenSize(width: number): void {
    this.isLargeScreen = width > 600;
  }

  async getGoal() {
    const userProfile = await this.firebaseService.getUserProfile();
    if (userProfile) {
      this.goalService.getDailyGoal().subscribe((res: any) => {
        this.dailyGoals = res;
        console.log("Daily Goals:", this.dailyGoals);
      });
      this.goalService.getPriorityGoal().subscribe((res: any) => {
        this.priorityGoals = res;
        console.log("Priority Goals:", this.priorityGoals);
      });
    } else {
      this.toasterService.showToast("No goals found : User not logged in.", "warning");
    }
  }

  updateDailyTask(checked: boolean, item: IGoalData) {
    item.progress = checked ? 100 : 0;
    item.updatedAt = this.goalForm.value.updatedAt;
    this.goalService.updateDailyGoal(item, item.idField);
  }

  updatePriorityTask(checked: boolean, item: IGoalData) {
    item.progress = checked ? 100 : 0;
    item.updatedAt = this.goalForm.value.updatedAt;
    this.goalService.updateGoal(item, item.idField);
  }

  markGoalAsDone(checked: boolean, item: IGoalData) {
    item.progress = checked ? 100 : 0;
    item.updatedAt = this.goalForm.value.updatedAt;
    this.goalService.updateGoal(item, item.idField);
  }

  editGoal(goal: IGoalData) {
    // Implement the logic to edit the goal
  }

  deleteGoal(goal: IGoalData, goalId: string) {
    this.goalService.deleteGoal(goal, goalId);
  }

  async openAddGoalModal(goalType: string) {
    if (!this.firebaseService.userData) {
      this.toasterService.showToast("Please login to add a goal.", "warning");
      return;
    }
    console.log("User is logged in:", this.firebaseService.userData);
    const modal = await this.modalController.create({
      component: QuickGoalModalComponent,
      componentProps: { goalType },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      console.log("Goal submitted from modal:", data, goalType);
      this.addGoal(data, goalType);
    }
  }

  addGoal(goalData: any, goalType: string) {
    this.goalForm.value.gTerm = goalType;
    this.goalForm.value.date = this.dateToday;
    this.goalForm.value.progress = 0;
    this.goalForm.value.updatedAt = serverTimestamp();
    this.goalForm.value.createdAt = serverTimestamp();
    this.goalForm.value.title = goalData.title;
    this.goalForm.value.description = goalData.description;
    this.goalService.addGoal(this.goalForm.value);
  }
}

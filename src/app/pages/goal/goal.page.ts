import { DatePipe } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { serverTimestamp } from "@angular/fire/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomDate } from "src/app/models/class/date/custom-date";
import { SeoTags } from "src/app/models/class/seoTags/seo";
import { GoalData } from "src/app/models/class/static/goal/goal";
import { IGoalData } from "src/app/models/interface/goals.interface";
import { GoalService } from "src/app/services/goal/goal.service";
import { SeoService } from "src/app/services/seo/seo.service";

@Component({
  selector: "app-goal",
  templateUrl: "./goal.page.html",
  styleUrls: ["./goal.page.scss"],
})
export class GoalPage implements OnInit {
  pageTitle = "Goal";
  title = SeoTags.pageTitle.goalPage;
  pageMetaTags = SeoTags.goalPageTags;

  submissionInProgress = false;
  dailyGoals: IGoalData[] = [];
  priorityGoals: IGoalData[] = [];
  isLargeScreen: boolean = false;

  constructor(
    private seoService: SeoService,
    private fb: FormBuilder,
    private goalService: GoalService,
    private datePipe: DatePipe,
  ) {}

  dateToday: string | null = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  goalType = GoalData.goalType;
  goalFor = GoalData.goalFor;
  goalForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    date: [this.dateToday, [Validators.pattern("^[a-zA-Z 0-9 .,-]*$")]],
    progress: [0, [Validators.pattern("^[0-9]*$"), Validators.max(100), Validators.min(0)]],
    gTerm: ["Tomorrow", [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]*$")]],
    type: ["Studies", [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]*$")]],
    title: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9, -.]*$")]],
    reward: ["", [Validators.pattern("^[a-zA-Z0-9\n, -.]*$")]],
    resource: ["", [Validators.pattern("^[a-zA-Z0-9\n, -.]*$")]],
    description: ["", [Validators.pattern("^[a-zA-Z0-9\n, -.]*$")]],
    actionSteps: ["", [Validators.pattern("^[a-zA-Z0-9\n, -.]*$")]],
    penalty: ["", [Validators.pattern("^[a-zA-Z0-9\n, -.]*$")]],
    updatedAt: [serverTimestamp()],
  });

  rewardError = "Only alphabets and numbers allowed";

  ngOnInit() {
    this.seoService.seo(this.title, this.pageMetaTags);
    this.loadGoals();
    this.checkScreenSize(window.innerWidth);
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.checkScreenSize(event.target.innerWidth);
  }

  private checkScreenSize(width: number): void {
    this.isLargeScreen = width > 600;
  }

  async addGoal() {
    this.submissionInProgress = true;
    await this.goalService.addGoal(this.goalForm.value);
    this.submissionInProgress = false;
    this.loadGoals();
  }

  async loadGoals() {
    const userId = this.goalService.fs.userData.uid;
    const dailyGoalsSnapshot = await this.goalService.goalCollection
      .doc(userId)
      .collection("dailyGoals")
      .get()
      .toPromise();
    this.dailyGoals = dailyGoalsSnapshot.docs.map((doc) => ({ idField: doc.id, ...doc.data() }) as IGoalData);

    const priorityGoalsSnapshot = await this.goalService.goalCollection
      .doc(userId)
      .collection("priorityGoals")
      .get()
      .toPromise();
    this.priorityGoals = priorityGoalsSnapshot.docs.map((doc) => ({ idField: doc.id, ...doc.data() }) as IGoalData);
  }

  async markGoalAsCompleted(goalId: string) {
    await this.goalService.markGoalAsCompleted(goalId);
    this.loadGoals();
  }

  async markGoalAsUncompleted(goalId: string) {
    await this.goalService.markGoalAsUncompleted(goalId);
    this.loadGoals();
  }

  async deleteGoal(goal: GoalData, goalId: string) {
    await this.goalService.deleteGoal(goal, goalId);
    this.loadGoals();
  }

  editGoal(goal: IGoalData) {
    // Implement the logic to edit the goal
  }

  dateUpdate() {
    let targetDate = this.dateToday;
    switch (this.goalForm.value.gTerm) {
      case "Daily":
        targetDate = this.dateToday;
        break;
      case "Tomorrow":
        targetDate = new CustomDate().getDateTomorrow();
        break;
      case "Short Term":
        targetDate = "";
        break;
      case "Long Term":
        targetDate = "";
        break;
      default:
        break;
    }

    this.goalForm.patchValue({
      date: targetDate,
    });
  }
}

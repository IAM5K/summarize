import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { serverTimestamp } from "@angular/fire/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomDate } from "src/app/models/class/date/custom-date";
import { SeoTags } from "src/app/models/class/seoTags/seo";
import { GoalData } from "src/app/models/class/static/goal";
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
  pageMetaTags = SeoTags.helpPageTags;
  constructor(
    private seoService: SeoService,
    private fb: FormBuilder,
    private goalService: GoalService,
    private datePipe: DatePipe
  ) {}
  dateToday: string | null = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  goalType = GoalData.goalType;
  goalFor = GoalData.goalFor;
  goalForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    date: [
      this.dateToday,
      [Validators.required, Validators.pattern("^[a-zA-Z 0-9 .,-]*$")],
    ],
    progress: [
      0,
      [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.max(100),
        Validators.min(0),
      ],
    ],
    gTerm: [
      "Tomorrow",
      [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]*$")],
    ],
    type: [
      "Studies",
      [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]*$")],
    ],
    title: [
      "",
      [Validators.required, Validators.pattern("^[a-zA-Z0-9, -.]*$")],
    ],
    reward: [
      "",
      [Validators.required, Validators.pattern("^[a-zA-Z0-9\n, -.]*$")],
    ],
    resource: [
      "",
      [Validators.required, Validators.pattern("^[a-zA-Z0-9\n, -.]*$")],
    ],
    description: [
      "",
      [Validators.required, Validators.pattern("^[a-zA-Z0-9\n, -.]*$")],
    ],
    actionSteps: [
      "",
      [Validators.required, Validators.pattern("^[a-zA-Z0-9\n, -.]*$")],
    ],
    penalty: [
      "",
      [Validators.required, Validators.pattern("^[a-zA-Z0-9\n, -.]*$")],
    ],
    updatedAt: [serverTimestamp()],
  });
  rewardError = "Only alphabets and numbers allowed";
  ngOnInit() {
    this.seoService.seo(this.title, this.pageMetaTags);
  }

  addGoal() {
    this.goalService.addGoal(this.goalForm.value);
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

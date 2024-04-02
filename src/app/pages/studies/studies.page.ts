import { DatePipe, ViewportScroller } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { serverTimestamp } from "@angular/fire/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SeoTags } from "src/app/models/class/seoTags/seo";
import { StudyOptionsData } from "src/app/models/data/studyOptions.data";
import { AlertService } from "src/app/services/alert/alert.service";
import { ProfileService } from "src/app/services/profile/profile.service";
import { SeoService } from "src/app/services/seo/seo.service";
import { StudiesService } from "src/app/services/studies/studies.service";

@Component({
  selector: "app-studies",
  templateUrl: "./studies.page.html",
  styleUrls: ["./studies.page.scss"],
})
export class StudiesPage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private studiesService: StudiesService,
    private seoService: SeoService,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private viewportScroller: ViewportScroller,
    private profileService: ProfileService,
  ) {}

  pageTitle = "Studies";
  pageMetaTags = SeoTags.studiesPageTags;
  studyMode = StudyOptionsData.studyMode;
  Studies: any = [];
  studiesCount: number = 0;
  currentTime = this.datePipe.transform(new Date(), "hh:mm");
  advancedMode: boolean = false;
  advancedModeAvailable: boolean = false;
  editMode: boolean = false;
  updateSubmitted: Boolean = false;
  dateToday: string | null = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  studiesForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    date: [this.dateToday, [Validators.required, Validators.pattern("^[a-zA-Z 0-9 .,-]*$")]],
    startTime: ["", [Validators.required, Validators.pattern("^[0-9:]*$")]],
    endTime: [this.currentTime, [Validators.required, Validators.pattern("^[0-9:]*$")]],
    type: ["read", [Validators.required, Validators.pattern("^[a-z]*$")]],
    subject: ["", [Validators.required, Validators.pattern("^[a-zA-Z 0-9 .,-]*$")]],
    topic: ["", [Validators.required, Validators.pattern("^[a-zA-Z 0-9\n .,-]*$")]],
    description: ["", [Validators.required, Validators.pattern("^[a-zA-Z 0-9\n .,-]*$")]],
    studyMode: ["self", [Validators.required, Validators.pattern("^[a-zA-Z 0-9 .,-]*$")]],
    updatedAt: [serverTimestamp()],
  });
  studiesTypes = StudyOptionsData.studiesTypes;
  updateDataId: string = "";
  ngOnInit() {
    this.getStudies();
    this.seoService.seo(this.pageTitle, this.pageMetaTags);
    this.activateAdvancedMode();
  }

  async getStudies() {
    await this.studiesService.getStudies().subscribe((res) => {
      this.Studies = res;
      this.studiesCount = this.Studies.length;
    });
  }
  manageStudies(idField?: string) {
    if (this.editMode) {
      this.updateStudies(this.studiesForm.value);
    } else {
      this.addStudies(this.studiesForm.value);
    }

    this.editMode = false;
    this.studiesForm.get("date")?.enable();
    this.studiesForm.patchValue({
      subject: "",
      topic: "",
      description: "",
    });
  }

  cancelUpdate() {
    this.editMode = false;
    this.studiesForm.markAsUntouched();
    this.studiesForm.get("date")?.enable();
    this.studiesForm.reset({
      date: this.dateToday,
      subject: "",
      topic: "",
      description: "",
    });
    this.updateSubmitted = false;
  }
  addStudies(value: any) {
    this.studiesService.addStudies(value);
  }

  updateStudies(value: any) {
    this.updateSubmitted = true;
    this.studiesService.updateStudies(value, this.updateDataId);
    this.cancelUpdate();
  }

  async deleteStudies(idField: string) {
    const response = await this.alertService.deleteAlert();
    if (response === "confirm") {
      this.studiesService.deleteStudies(idField);
    }
  }
  async editStudies(data: any) {
    this.studiesForm.patchValue({
      createdAt: data.createdAt,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      type: data.type,
      subject: data.subject,
      topic: data.topic,
      description: data.description,
      studyMode: data.studyMode,
      updatedAt: serverTimestamp(),
    });
    this.updateDataId = data.idField;
    this.studiesForm.get("date")?.disable();
    this.editMode = true;
  }

  async activateAdvancedMode() {
    const profileData = await this.profileService.getProfileData();
    if (profileData.educationDetails) {
      this.advancedModeAvailable = true;
      this.advancedMode = true;
    }
  }
}

import { DatePipe, ViewportScroller } from "@angular/common";
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit } from "@angular/core";
import { serverTimestamp } from "@angular/fire/firestore";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SeoTags } from "src/app/models/class/seoTags/seo";
import { StudyOptionsData } from "src/app/models/data/studyOptions.data";
import { extractSubjects } from "src/app/models/functions/studies.function";
import { AlertService } from "src/app/services/alert/alert.service";
import { ProfileService } from "src/app/services/profile/profile.service";
import { SeoService } from "src/app/services/seo/seo.service";
import { StudiesService } from "src/app/services/studies/studies.service";
import { RealTimeDataBaseService } from "src/app/shared/db/real-time-data-base.service";

@Component({
  selector: "app-studies",
  templateUrl: "./studies.page.html",
  styleUrls: ["./studies.page.scss"],
})
export class StudiesPage implements OnInit, AfterViewInit, AfterContentInit {
  examAspirations: any;
  examsList: any;
  subjects: any[];
  subTopic: string[];
  constructor(
    private fb: FormBuilder,
    private studiesService: StudiesService,
    private seoService: SeoService,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private viewportScroller: ViewportScroller,
    private profileService: ProfileService,
    private changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone,
    private rtdb: RealTimeDataBaseService,
  ) {}

  pageTitle = "Studies";
  pageMetaTags = SeoTags.studiesPageTags;
  studyMode = StudyOptionsData.studyMode;
  Studies: any = [];
  studiesCount: number = 0;
  currentTime = this.datePipe.transform(new Date(), "hh:mm");
  advancedMode: boolean = false;
  advancedModeAvailable: boolean = true;
  editMode: boolean = false;
  updateSubmitted: boolean = false;
  dateToday: string | null = this.datePipe.transform(new Date(), "yyyy-MM-dd");

  studiesForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    date: [this.dateToday, [Validators.required, Validators.pattern("^[a-zA-Z 0-9 .,-]*$")]],
    startTime: ["", [Validators.required, Validators.pattern("^[0-9:]*$")]],
    endTime: [this.currentTime, [Validators.required, Validators.pattern("^[0-9:]*$")]],
    type: ["read", [Validators.required, Validators.pattern("^[a-z]*$")]],
    subject: ["", [Validators.required, Validators.pattern("^[a-zA-Z 0-9 .,-]*$")]],
    topic: ["", [Validators.required, Validators.pattern("^[a-zA-Z 0-9\n .,-]*$")]],
    subTopic: ["", [Validators.pattern("^[a-zA-Z 0-9\n .,-]*$")]],
    description: ["", [Validators.required, Validators.pattern("^[a-zA-Z 0-9\n .,-]*$")]],
    studyMode: ["self", [Validators.required, Validators.pattern("^[a-zA-Z 0-9 .,-]*$")]],
    updatedAt: [serverTimestamp()],
  });
  studiesTypes = StudyOptionsData.studiesTypes;
  updateDataId: string = "";
  ngOnInit() {
    this.seoService.seo(this.pageTitle, this.pageMetaTags);
  }
  ngAfterViewInit(): void {
    this.getStudies();
    this.activateAdvancedMode();
  }

  async ngAfterContentInit(): Promise<void> {
    await this.rtdb.getTargetExam().subscribe((data) => {
      this.examsList = data;
    });
    this.getActiveExamList();
  }

  getActiveExamList() {
    this.profileService.getExams().subscribe((res: any) => {
      this.examAspirations = res;
      this.subjects = extractSubjects(this.examAspirations, this.examsList);
    });
  }
  async getStudies() {
    await this.studiesService.getStudies().subscribe((res) => {
      this.Studies = res;
      this.studiesCount = this.Studies.length;
    });
  }
  manageStudies(_idField?: string) {
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
  addControls() {
    this.studiesForm.addControl("subject", new FormControl("", Validators.required));
    this.studiesForm.addControl("topic", new FormControl("", Validators.required));
    this.studiesForm.addControl("description", new FormControl("", Validators.required));
    this.studiesForm.addControl("studyMode", new FormControl("", Validators.required));
    this.studiesForm.addControl("subTopic", new FormControl(""));
  }

  // INFO: Log current controls after change detection
  logCurrentControls() {
    const controls = this.studiesForm.controls;
    console.log("Current form controls:", Object.keys(controls));
  }

  typeChanged() {
    const typeValue = this.studiesForm.get("type").value;
    this.zone.run(() => {
      switch (typeValue) {
        case "slept":
        case "break":
          this.studiesForm.removeControl("subject");
          this.studiesForm.removeControl("topic");
          this.studiesForm.removeControl("studyMode");
          this.studiesForm.removeControl("subTopic");
          break;

        default:
          this.addControls();
          break;
      }
    });
    this.logCurrentControls();
    // if (typeValue === "test") {
    //   // Remove existing fields
    //   this.studiesForm.removeControl("subject");
    //   this.studiesForm.removeControl("topic");

    //   // Add new fields
    //   this.studiesForm.addControl("testField1", new FormControl("", [Validators.required]));
    //   this.studiesForm.addControl("testField2", new FormControl("", [Validators.required]));

    //   // Update the UI (if necessary)
    //   // You can use Angular's ChangeDetectorRef to trigger change detection
    //   this.changeDetectorRef.detectChanges();
    // } else {
    //   // Restore original fields if type is not 'test'
    //   this.studiesForm.addControl(
    //     "subject",
    //     new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z 0-9 .,-]*$")]),
    //   );
    //   this.studiesForm.addControl(
    //     "topic",
    //     new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z 0-9\n .,-]*$")]),
    //   );

    //   // Remove added fields
    //   this.studiesForm.removeControl("testField1");
    //   this.studiesForm.removeControl("testField2");
    // }
  }

  subjectChanged() {
    const subjectValue = this.studiesForm.get("subject").value;
    console.log("Subject value", subjectValue); // Output: Physics

    // Find the subject object with the name "Physics"
    const selectedSubject = this.subjects.find((subject) => subject.name === subjectValue);

    if (selectedSubject) {
      // Assign subcategories to subcategory array
      this.subTopic = selectedSubject.subcategories;
      console.log(this.subTopic); // Output: ["Classical Mechanics", "Quantum Mechanics", ...]
    }
  }

  async activateAdvancedMode() {
    const profileData = await this.profileService.getProfileData();
    if (profileData.educationDetails) {
      this.advancedModeAvailable = true;
      this.advancedMode = false;
    } else {
      this.advancedModeAvailable = false;
    }
  }
}

import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { serverTimestamp } from "@angular/fire/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CustomDate } from "../models/class/date/custom-date";
import { SeoTags } from "../models/class/seoTags/seo";
import { AlertService } from "../services/alert/alert.service";
import { SeoService } from "../services/seo/seo.service";
import { ResourceService } from "../services/resource/resource.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.scss"],
})
export class AdminPage implements OnInit {


  pageTitle = "Resource"
  title = SeoTags.pageTitle.resourcePage
  pageMetaTags = SeoTags.helpPageTags
  constructor(
    private seoService: SeoService,
    private fb: FormBuilder,
    private resourceService: ResourceService,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private router: Router) { }
  dateToday: string | null = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  resourceForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    date: [this.dateToday, [Validators.required, Validators.pattern("^[a-zA-Z 0-9 .,-]*$")]],
    progress: [0, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(100), Validators.min(0)]],
    gTerm: ["Daily", [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]*$")]],
    type: ["Studies", [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]*$")]],
    title: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9, -.]*$")]],
    reward: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9\n, -.]*$")]],
    resource: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9\n, -.]*$")]],
    description: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9\n, -.]*$")]],
    actionSteps: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9\n, -.]*$")]],
    penalty: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9\n, -.]*$")]],
    updatedAt: [serverTimestamp()]
  })
  resourceData:any;
  ngOnInit() {
    this.seoService.seo(this.title, this.pageMetaTags)
    // this.resourceService.getResource().subscribe((res:any)=>{
    //   console.log(res);
    //   this.resourceData=res

    // })
  }
  rewardError = "Only alphabets and numbers allowed"

  addResource() {
    // this.resourceService.addResource(this.resourceForm.value);
  }
  dateUpdate() {
    let targetDate = this.dateToday;
    switch (this.resourceForm.value.gTerm) {
      case "Daily":
        targetDate = this.dateToday
        break;
      case "Tomorrow":
        targetDate = new CustomDate().getDateTomorrow() ;
        break;
      case "Short Term":
        targetDate = ""
        break;
      case "Long Term":
        targetDate = ""
        break;
      default:
        break;
    }

    this.resourceForm.patchValue({
      date: targetDate
    })
  }
}

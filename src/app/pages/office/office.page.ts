import { Component, OnInit } from "@angular/core";
import { Clipboard } from "@capacitor/clipboard";
import { serverTimestamp } from "@angular/fire/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OfficeService } from "src/app/services/office/office.service";
import { SeoService } from "src/app/services/seo/seo.service";
@Component({
  selector: "app-office",
  templateUrl: "./office.page.html",
  styleUrls: ["./office.page.scss"],
})
export class OfficePage implements OnInit {
  pageTitle = "Office";
  pageMetaTags = [
    {
      name: "description",
      content: "Summarize all your expenses here. Summarize will help you to check them down in the list immediately and later Analyze them to have an understanding about where you can spend wisely and how to manage your expenses in better way. Soon we will also give finance tips that will help you better."
    },
    {
      name: "keyword",
      content: "Summarize, Summarize, arise, arize, money managemnet, expense management, cost analysis,summarize-ng, summarize-ng, digital dairy, expense analysis"
    },
    {
      name: "author",
      content: "Sandeep Kumar"
    }
  ];
  Works: any = [];
  worksCount: number = 0;
  getCount: number = 0;
  dateToday= (new Date().getFullYear()) + "-0" + (new Date().getMonth() + 1) + "-" + (new Date().getDate());

  constructor(
    private fb: FormBuilder,
    private seoService: SeoService,
    private officeService: OfficeService
  ) { }
  workForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    date: [this.dateToday, [Validators.required, Validators.pattern("^[a-zA-Z 0-9 .,-]*$")]],
    startTime: ["", [Validators.required, Validators.pattern("^[0-9:]*$")]],
    endTime: ["", [Validators.required, Validators.pattern("^[0-9:]*$")]],
    type: ["coding", [Validators.required, Validators.pattern("^[a-zA-Z 0-9 :/.,-]*$")]],
    description: ["", [Validators.required, Validators.pattern("^[a-zA-Z 0-9 .,-]*$")]],
    // spendedOn: ['self', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    updatedAt: [serverTimestamp()]
  })
  ngOnInit() {
    this.getWork();
    this.seoService.seo(this.pageTitle, this.pageMetaTags);
  }

  async getWork() {
    this.getCount = 5;
    await this.officeService.getWork(this.getCount).subscribe(res => {
      this.Works = res
      this.worksCount = this.Works.length
    })

  }
  async getAllWork() {
    this.getCount = 0;
    await this.officeService.getWork(this.getCount).subscribe(res => {
      this.Works = res
      this.worksCount = this.Works.length
    })

  }
  addWork() {
    this.officeService.addWork(this.workForm.value)
  }

  deleteWork(idField: string) {
    this.officeService.deleteWork(idField)
  }

  async copyToClipboard(work: any) {
    await Clipboard.write({
      string: `${work.description} : (${work.startTime} - ${work.endTime}) `
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { serverTimestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeoService } from 'src/app/services/seo/seo.service';
import { StudiesService } from 'src/app/services/studies/studies.service';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.page.html',
  styleUrls: ['./studies.page.scss'],
})
export class StudiesPage implements OnInit {
  pageTitle = "Studies";
  pageMetaTags = [
    {
      name: 'description',
      content: "Summarize all your expences here. Summarize will help you to check them down in the list immediately and later Analyze them to have an understanding about where you can spend wisely and how to manage your expences in better way. Soon we will also give finance tips that will help you better."
    },
    {
      name: 'keyword',
      content: 'Summarize, Summarize, arise, arize, money managemnet, expense management, cost analysis,summarize-ng, summarize-ng, digital dairy, expense analysis'
    },
    {
      name: 'author',
      content: 'Sandeep Kumar'
    }
  ];
  Studies: any = [];
  studiesCount: number = 0;
  dateToday = (new Date().getFullYear()) + "-0" + (new Date().getMonth() + 1) + "-" + (new Date().getDate());
  currentTime = (new Date().getHours()+":"+ new Date().getMinutes())
  constructor(
    private fb: FormBuilder,
    private studiesService: StudiesService,
    private seoService: SeoService
  ) { }

  studiesForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    date: [this.dateToday, [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    startTime: ['', [Validators.required, Validators.pattern('^[0-9:]*$')]],
    endTime: [this.currentTime, [Validators.required, Validators.pattern('^[0-9:]*$')]],
    type: ['read', [Validators.required, Validators.pattern('^[a-z]*$')]],
    subject: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    topic: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    description: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    studyMode: ['self', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    updatedAt: [serverTimestamp()]
  })
  studiesTypes = [
    { title: "Learn", value: "learn" },
    { title: "Practice", value: "practice" },
    { title: "Read", value: "read" },
    { title: "Write", value: "write" },
    { title: "Test", value: "test" }
  ]
  ngOnInit() {
    this.getStudies()
    this.seoService.seo(this.pageTitle, this.pageMetaTags)
  }

  async getStudies() {
    await this.studiesService.getStudies().subscribe(res => {
      this.Studies = res
      this.studiesCount = this.Studies.length
    })


  }
  addStudies() {
    this.studiesService.addStudies(this.studiesForm.value)
    this.studiesForm.patchValue({
      subject: '',
      topic: '',
      description: ''
    })
  }

}

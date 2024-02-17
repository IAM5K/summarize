import { DatePipe, ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { serverTimestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { SeoService } from 'src/app/services/seo/seo.service';
import { StudiesService } from 'src/app/services/studies/studies.service';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.page.html',
  styleUrls: ['./studies.page.scss']
})
export class StudiesPage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private studiesService: StudiesService,
    private seoService: SeoService,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private viewportScroller: ViewportScroller,
    private profileService: ProfileService
  ) { }

  pageTitle = "Studies";
  pageMetaTags = [
    {
      name: 'description',
      content: "Summarize all your expenses here. Summarize will help you to check them down in the list immediately and later Analyze them to have an understanding about where you can spend wisely and how to manage your expenses in better way. Soon we will also give finance tips that will help you better."
    },
    {
      name: 'keyword',
      content: 'Summarize, Summarize, arise, arize, money management, expense management, cost analysis,summarize-ng, summarize-ng, digital dairy, expense analysis'
    },
    {
      name: 'author',
      content: 'Sandeep Kumar'
    }
  ];
  Studies: any = [];
  studiesCount: number = 0;
  currentTime = this.datePipe.transform(new Date(), 'hh:mm');
  advancedMode:boolean = true;
  advancedModeAvailable:boolean = false;
  editMode:boolean = false;
  dateToday: string | null = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  studiesForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    date: [this.dateToday, [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    startTime: ['', [Validators.required, Validators.pattern('^[0-9:]*$')]],
    endTime: [this.currentTime, [Validators.required, Validators.pattern('^[0-9:]*$')]],
    type: ['read', [Validators.required, Validators.pattern('^[a-z]*$')]],
    subject: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    topic: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9\n .,-]*$')]],
    description: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9\n .,-]*$')]],
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
  updateDataId:string ="";
  ngOnInit() {
    this.getStudies()
    this.seoService.seo(this.pageTitle, this.pageMetaTags);
    this.activateAdvancedMode();
  }

  async getStudies() {
    await this.studiesService.getStudies().subscribe(res => {
      this.Studies = res
      this.studiesCount = this.Studies.length
    })


  }
  manageStudies(idField?:string){
    if (this.editMode) {
      // console.log();

      this.updateStudies(this.studiesForm.value)
    } else {
      this.addStudies(this.studiesForm.value)
    }

    this.editMode = false
    this.studiesForm.get('date')?.enable();
    this.studiesForm.patchValue({
      subject: '',
      topic: '',
      description: ''
    })
  }

  addStudies(value: any) {
    this.studiesService.addStudies(value)
  }

  updateStudies(value:any) {
    // console.log(value);
    this.studiesService.updateStudies(value,this.updateDataId)
    this.updateDataId=""

  }

  async deleteStudies(idField:string){
    const response = await this.alertService.deleteAlert()
    if (response === "confirm") {
    this.studiesService.deleteStudies(idField)
    }
  }
  async editStudies(data:any){
    this.studiesForm.patchValue({
      createdAt:data.createdAt,
      date:data.date,
      startTime:data.startTime,
      endTime:data.endTime,
      type:data.type,
      subject:data.subject,
      topic:data.topic,
      description:data.description,
      studyMode:data.studyMode,
      updatedAt: serverTimestamp()
    })
    this.updateDataId= data.idField;
    this.studiesForm.get('date')?.disable();
    this.editMode = true;
  }

  async activateAdvancedMode(){
    const profileData = await this.profileService.getProfileData();
    if(profileData.educationDetails){
      this.advancedModeAvailable = true
      this.advancedMode = true;
      // console.log(profileData);      
    } 
  }
}

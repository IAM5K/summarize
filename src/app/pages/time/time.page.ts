import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { serverTimestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfficeService } from 'src/app/services/office/office.service';
import { SeoService } from 'src/app/services/seo/seo.service';
import { CustomDate } from 'src/app/models/class/date/custom-date';
import { AlertService } from 'src/app/services/alert/alert.service';
import { DatePipe } from '@angular/common';
import { Project } from 'src/app/models/interface/profile.interface';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { WorkInterface } from 'src/app/models/interface/work.interface';

@Component({
  selector: 'app-time',
  templateUrl: './time.page.html',
  styleUrls: ['./time.page.scss'],
})
export class TimePage implements OnInit {
  
  constructor(
    private fb: FormBuilder,
    private seoService: SeoService,
    private officeService: OfficeService,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private profileService: ProfileService
  ) { }

  pageTitle = "Time";
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
  projectSubscription:any;
  Works: any = [];
  worksCount: number = 0;
  getCount: number = 0;
  currentDate = new Date()
  currentTime = this.datePipe.transform(this.currentDate, 'hh:mm');
  workByDate:any = []
  projects: Project[] = [];
  editMode:Boolean = false;
  editWorkData:WorkInterface;
  updateSubmitted:Boolean = false;
  dateToday: string | null = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  workOf = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  workForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    date: [this.dateToday, [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    startTime: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 :-]*$')]],
    endTime: [this.currentTime, [Validators.required, Validators.pattern('^[a-zA-Z0-9 :-]*$')]],
    project: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 :/.,-]*$')]],
    type: ['coding', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 :/.,-]*$')]],
    description: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\n .,-:\']*$')]],
    updatedAt: [serverTimestamp()]
  })

  ngOnInit() {
    this.getWork();
    this.seoService.seo(this.pageTitle, this.pageMetaTags);
    this.getProjects();
  }

  async getWork() {
    this.getCount = 5;
    this.officeService.getWork(this.getCount).subscribe(res => {
      this.Works = res;
      this.worksCount = this.Works.length;
    })

  }

  async getAllWork() {
    this.getCount = 0;
    this.officeService.getWork(this.getCount).subscribe(res => {
      this.Works = res;
      this.worksCount = this.Works.length;
    })

  }

  async getProjects() {
    this.projectSubscription = await this.profileService.getProjects().subscribe((res: any) => {
      console.log("getProjects",res);
      this.projects = res;
      if (this.projects.length>0) {
        this.workForm.patchValue({
          project : this.projects[0].name
        })       
      }
    });
  }

  async addWork() {
    const response = await this.officeService.addWork(this.workForm.value);
    if (response) {
      // Reset the form on successful addition
      this.workForm.patchValue({
        startTime: '',
        description: '',
      });
    }
  }

  editWork(work){
    this.editMode = true;
    this.editWorkData = work;
    console.log(this.editWorkData);
    
    this.workForm.patchValue({
      createdAt: work.createdAt,
      date: work.date,
      startTime: work.startTime,
      endTime: work.endTime,
      project: work.project?work.project:this.projects[0].name,
      type: work.type,
      description: work.description,
      updatedAt: serverTimestamp(),
    });
  }

  async updateWork(){
    this.updateSubmitted = true;
    const response = await this.officeService.updateWork(this.workForm.value, this.editWorkData.idField);
    if (response) {
      this.cancelUpdate();
      this.backToDefault();
    }
    else{
      this.updateSubmitted = false;
    }
  }

  cancelUpdate(){
    this.editMode=false;
  }

  backToDefault(){
        
    this.workForm.patchValue({
      date: this.dateToday,
      startTime: '',
      endTime: this.currentTime,
      project: this.projects[0].name,
      type: "coding",
      description: "",
      updatedAt: '',
    });
  }
  async deleteWork(idField: string) {
    const response = await this.alertService.deleteAlert()
    if (response === "confirm") {
      this.officeService.deleteWork(idField)
    }
  }

  async copyToClipboard(work: any) {
    await Clipboard.write({
      string: `${work.description} : (${work.startTime} - ${work.endTime}) `
    });
  }
  async getAllWorkOf() {
    if (this.workOf !== null) {
       (await this.officeService.getWorkByDate(this.workOf)).subscribe((res:any) => {
        this.workByDate = res;
      })
    }
  }

  async copyAllOfDay(){
    let dataString:string = "";
    this.workByDate.forEach((element:any) => {
      dataString += `${element.startTime} - ${element.endTime} (${element.type}) : ${element.description} \n`
    });
    console.log(dataString);
    await Clipboard.write({
      string: dataString
    });
  }

  ngOnDestroy(){
    console.log("Time page destroyed");
    this.projectSubscription.unsubscribe();
  }
}

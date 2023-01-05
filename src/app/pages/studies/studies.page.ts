import { Component, OnInit } from '@angular/core';
import { serverTimestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudiesService } from 'src/app/services/studies/studies.service';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.page.html',
  styleUrls: ['./studies.page.scss'],
})
export class StudiesPage implements OnInit {
  pageTitle = "Studies";
  Studies:any=[];
  studiesCount:number=0
  constructor(
    private fb: FormBuilder,
    private studiesService: StudiesService
  ) { }

  studiesForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    date: [Date, [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    startTime: ['', [Validators.required, Validators.pattern('^[0-9:]*$')]],
    endTime: ['', [Validators.required, Validators.pattern('^[0-9:]*$')]],
    type: ['reading', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 :/.,-]*$')]],
    subject: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    topic: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    description: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    studyMode: ['self', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    updatedAt: [serverTimestamp()]
  })
  studiesTypes=[
    {title:"Learn", value:"learn"},
    {title:"Practice", value:"practice"},
    {title:"Read", value:"read"},
    {title:"Write", value:"write"},
    {title:"Test", value:"test"}
  ]
  ngOnInit() {
    this.getStudies()
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
      amount: '',
      description: ''
    })
  }

}

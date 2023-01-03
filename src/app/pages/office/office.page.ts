import { Component, OnInit } from '@angular/core';

import { serverTimestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfficeService } from 'src/app/services/office/office.service';
@Component({
  selector: 'app-office',
  templateUrl: './office.page.html',
  styleUrls: ['./office.page.scss'],
})
export class OfficePage implements OnInit {
  pageTitle = "Office"
  Works:any=[];
  worksCount:number=0
  constructor(
    private fb: FormBuilder,
    private officeService: OfficeService
  ) { }
  workForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    date: [new Date(), [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    startTime: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    endTime: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    type: ['coding', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 :/.,-]*$')]],
    description: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    // spendedOn: ['self', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    updatedAt: [serverTimestamp()]
  })
  ngOnInit() {
    this.getWork()
  }

  async getWork(){
    await this.officeService.getWork().subscribe(res=>{
      this.Works = res
      this.worksCount = this.Works.length
    })

  }
  addWork() {
    // console.log(this.workForm.value);
    this.officeService.addWork(this.workForm.value)
  }

}

import { Component, OnInit } from '@angular/core';
import { ExpenceService } from 'src/app/services/expence/expence.service';

import { serverTimestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-expences',
  templateUrl: './expences.page.html',
  styleUrls: ['./expences.page.scss'],
})
export class ExpencesPage implements OnInit {
  pageTitle = "Expenses"
  Expences:any=[];
  expencesCount:number=0
  expenceTypes=[
    {title:"Emi and Bills", value:"emi"},
    {title:"Education", value:"education"},
    {title:"Food", value:"food"},
    {title:"Groceries", value:"grocery"},
    {title:"Health and Personal care", value:"health"},
    {title:"Home and Utilities", value:"utilities"},
    {title:"Insurance", value:"insurance"},
    {title:"Refreshments", value:"refreshments"},
    {title:"Transportation or Travel", value:"transportation"},
    {title:"Miscellaneous", value:"miscellaneous"},
  ]
  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenceService
  ) { }
  expenceForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    date: [Date, [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    amount: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    type: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 :/.,-]*$')]],
    description: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    spendedOn: ['self', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    updatedAt: [serverTimestamp()]
  })
  ngOnInit() {
    this.getExpences()
  }

  async getExpences(){
    await this.expenseService.getExpences().subscribe(res=>{
      this.Expences = res
      this.expencesCount = this.Expences.length
    })


  }
  addExpence() {
    this.expenseService.addExpense(this.expenceForm.value)
    this.expenceForm.patchValue({
      amount:'',
      description:''
    })
  }
}

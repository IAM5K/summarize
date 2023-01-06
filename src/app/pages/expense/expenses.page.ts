import { Component, OnInit } from '@angular/core';

import { serverTimestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/services/expense/expense.service';
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {
  pageTitle = "Expenses"
  Expenses:any=[];
  expensesCount:number=0
  dataSize=5;
  expenseTypes=[
    {title:"Bills", value:"bill"},
    {title:"Emi", value:"emi"},
    {title:"Education", value:"education"},
    {title:"Food", value:"food"},
    {title:"Groceries", value:"grocery"},
    {title:"Health and Personal care", value:"health"},
    {title:"Home and Utilities", value:"utilities"},
    {title:"Insurance", value:"insurance"},
    {title:"Refreshments", value:"refreshments"},
    {title:"Rent", value:"rent"},
    {title:"Shopping", value:"shopping"},
    {title:"Transportation or Travel", value:"transportation"},
    {title:"Miscellaneous", value:"miscellaneous"},
  ]
  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService
  ) { }
  expenseForm: FormGroup = this.fb.group({
    createdAt: [serverTimestamp()],
    date: [Date, [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    amount: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    type: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 :/.,-]*$')]],
    description: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    spendedOn: ['self', [Validators.required, Validators.pattern('^[a-zA-Z 0-9 .,-]*$')]],
    updatedAt: [serverTimestamp()]
  })
  ngOnInit() {
    this.getExpenses()
  }

  async getExpenses(){
    await this.expenseService.getExpenses(this.dataSize).subscribe((res:any)=>{
      this.Expenses = res
      this.expensesCount = this.Expenses.length
    })


  }
  addExpense() {
    this.expenseService.addExpense(this.expenseForm.value)
    this.expenseForm.patchValue({
      amount:'',
      description:''
    })
  }
}

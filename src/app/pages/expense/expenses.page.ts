import { Component, OnInit } from '@angular/core';

import { serverTimestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/services/expense/expense.service';
import { SeoService } from 'src/app/services/seo/seo.service';
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {
  pageTitle = "Expenses"
  pageMetaTags=[
    {
      name:'description',
      content:"Summarize all your expences here. Summarize will help you to check them down in the list immediately and later Analyze them to have an understanding about where you can spend wisely and how to manage your expences in better way. Soon we will also give finance tips that will help you better."
    },
    {
      name:'keyword',
      content:'Summarize, Summarize, arise, arize, money managemnet, expense management, cost analysis,summarize-ng, summarize-ng, digital dairy, expense analysis'
    },
    {
      name:'author',
      content:'Sandeep Kumar'
    }
  ];
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
    private seoService: SeoService,
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
    this.getExpenses();
    this.seoService.seo(this.pageTitle,this.pageMetaTags);
  }

  async getExpenses(){
    this.dataSize=5;
    await this.expenseService.getExpenses(this.dataSize).subscribe((res:any)=>{
      this.Expenses = res;
      this.expensesCount = this.Expenses.length;
    })
  }
  async getAllExpenses(){
    this.dataSize=0;
    await this.expenseService.getExpenses(this.dataSize).subscribe((res:any)=>{
      this.Expenses = res;
      this.expensesCount = this.Expenses.length;
    })
  }

  addExpense() {
    this.expenseService.addExpense(this.expenseForm.value);
    this.expenseForm.patchValue({
      amount:'',
      description:''
    });
    this.seoService.eventTrigger("form",this.pageTitle);
  }
  deleteExpense(idField:string){
    this.expenseService.deleteExpense(idField);
  }
}

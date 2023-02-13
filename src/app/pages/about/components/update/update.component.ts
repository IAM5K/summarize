import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  pageTitle="Updates"
  constructor() { }
  updates=[
    {
      version:"r.1.3",
      date:"12-02-2023",
      details:[
        "12 hour Time format added",
        "Expense Filters updated",
        "Budget Input Added"
      ]
    },
    {
      version:"r.1.2",
      date:"29-01-2023",
      details:[
        "12 hour Time format added",
        "Expense Filters updated"
      ]
    },
    {
      version:"r.1.1",
      date:"10-01-2023",
      details:[
        "Ui Bug Fixed",
        "Profile page added",
        "Auto-fill date and time",
        "Added Copy to clipboard",
        "Achievement Module Added with timeline flow."
      ]
    },
    {
      version:"r.1.0",
      date:"07-01-2023",
      details:[
        "Expence Module: Add and View ",
        "Time / Work Module: Add and View",
        "Studies Module : Add and View."
      ]
    },
    // {
    //   version:"",
    //   details:""
    // },
  ]
  ngOnInit() {}

}

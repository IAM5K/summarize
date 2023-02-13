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
      date:"13-02-2023",
      details:[
        "12 hour Time format added",
        "Expense Filters updated",
        "Budget Input Added",
        "Update and details",
        "Top contributors",
        "Filter by type bug fixed"
      ]
    },
    {
      version:"r.1.2",
      date:"29-01-2023",
      details:[
        "12 hour Time format added",
        "Expense Filters updated",
        "Delete Feature for Studies",
        "Achievement Module Added with timeline flow."
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
        "Delete for Expense and Work"
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

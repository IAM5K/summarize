import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent {
  pageTitle="Updates"
  constructor() { }
  updates=[
    {
      version:"r.1.7",
      date:"21-06-2023",
      details:[
        "Export expense data to Excel",
        "Update budget button disabled for default",
        "Update and details"
      ]
    },
    {
      version:"r.1.6",
      date:"27-05-2023",
      details:[
        "Edit Studies feature added",
        "Study table changed to card",
        "Options added in Expense type",
        "Update and details"
      ]
    },
    {
      version:"r.1.5",
      date:"27-05-2023",
      details:[
        "Get work summary of specific date.",
        "Copy all day summary to clipboard",
        "Resizable data grid of work summary",
        "Update and details"
      ]
    },
    {
      version:"r.1.4",
      date:"17-05-2023",
      details:[
        "Budget Management Added",
        "Monthly Expense Analysis",
        "Filter by type bug fixed",
        "Update and details"
      ]
    },
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
        "Expense Module: Add and View ",
        "Time / Work Module: Add and View",
        "Studies Module : Add and View."
      ]
    },
    // {
    //   version:"",
    //   details:""
    // },
  ]

}

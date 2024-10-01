import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-filter-expense",
  templateUrl: "./filter-expense.component.html",
  styleUrls: ["./filter-expense.component.scss"],
})
export class FilterExpenseComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Filter expense component");

  }

}

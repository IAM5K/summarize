import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-expense-card",
  templateUrl: "./expense-card.component.html",
  styleUrls: ["./expense-card.component.scss"],
})
export class ExpenseCardComponent {
  @Input() expenseItem: any;
  @Input() editExpense: any;
  @Input() deleteExpense: any;

  @Output() deleteClicked: EventEmitter<any> = new EventEmitter();
  @Output() editClicked: EventEmitter<any> = new EventEmitter();
  constructor() {}

  onDeleteClick() {
    this.deleteClicked.emit(this.expenseItem);
  }

  onEditClick() {
    this.editClicked.emit(this.expenseItem);
  }
}

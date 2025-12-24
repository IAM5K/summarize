import { Component, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "app-expense-card",
    templateUrl: "./expense-card.component.html",
    styleUrls: ["./expense-card.component.scss"],
    standalone: false
})
export class ExpenseCardComponent implements OnInit {
  @Input() expenseItem: any;
  @Input() editExpense: any;
  @Input() deleteExpense: any;

  @Output() deleteClicked: EventEmitter<any> = new EventEmitter();
  @Output() editClicked: EventEmitter<any> = new EventEmitter();
  constructor() {}

  onDeleteClick() {
    this.deleteClicked.emit(this.expenseItem);
  }

  isLargeScreen: boolean = false;

  ngOnInit() {
    this.checkScreenSize(window.innerWidth);
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.checkScreenSize(event.target.innerWidth);
  }

  private checkScreenSize(width: number): void {
    this.isLargeScreen = width > 600;
  }

  onEditClick() {
    this.editClicked.emit(this.expenseItem);
  }
  getBadgeColor(spentTo: string): string {
    switch (spentTo) {
      case "family":
        return "success";
        break;
      case "group":
        return "danger";
        break;
      default:
        return "secondary";
        break;
    }
  }
}

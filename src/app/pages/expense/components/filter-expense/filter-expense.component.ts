import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IonModal } from "@ionic/angular";
import { CustomDate } from "src/app/models/class/date/custom-date";
import { ExpenseStaticData } from "src/app/models/class/static/expense/expense-data";
import { Options } from "src/app/models/interface/masterData.model";

interface FilterData {
  filterCategory: string;
  parameter?: string;
  duration?: string;
  customRange?: { start: string; end: string };
}

@Component({
  selector: "app-filter-expense",
  templateUrl: "./filter-expense.component.html",
  styleUrls: ["./filter-expense.component.scss"],
})
export class FilterExpenseComponent implements OnInit {
  @Output() filterApplied = new EventEmitter<FilterData>();
  @Output() cancel = new EventEmitter<void>();
  @Input() modal!: IonModal;

  // New filter state variables
  filterCategory: "spentOn" | "type" | "duration" = "spentOn";
  selectedOption: string = "self"; // for spentOn or type filter
  selectedDuration: string = ""; // holds a value from durationFilter list
  fromDate: string = "";
  toDate: string = "";
  title = "Filter Expenses";

  // Use for options display
  spentOnOptions = ExpenseStaticData.spentOn;
  expenseTypeOptions = ExpenseStaticData.expenseTypes;
  dateToday: string | null = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  weekBackDate: string | null = this.datePipe.transform(new CustomDate().getWeekBackDate(), "yyyy-MM-dd");
  // Duration options – last value is 'custom'
  durationFilter: Options[] = [
    { title: "Today", value: this.dateToday },
    { title: "7 Days", value: this.weekBackDate },
    { title: "30 Days", value: this.datePipe.transform(new CustomDate().getLastMonthDate(), "yyyy-MM-dd") },
    { title: "365 Days", value: this.datePipe.transform(new CustomDate().getLastYearDate(), "yyyy-MM-dd") },
    { title: "This Month", value: new CustomDate().getThisMonth() },
    { title: "This Year", value: new CustomDate().getThisYear() },
    { title: "Custom", value: "custom" },
  ];

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    console.log("Filter expense component initialized");
    this.loadDefaultFilters();
  }

  applyFilter(): void {
    console.log("Filter applied");
    const filterData: FilterData = { filterCategory: this.filterCategory };
    if (this.selectedDuration === "custom") {
      filterData.customRange = { start: this.fromDate, end: this.toDate };
    } else {
      filterData.duration = this.selectedDuration;
    }
    if (this.filterCategory === "spentOn" || this.filterCategory === "type") {
      filterData.parameter = this.selectedOption;
    }
    localStorage.setItem("expenseFilters", JSON.stringify(filterData));
    // Removed emit call as it is not needed, modal.dismiss(filterData) sends data to the parent.
    this.modal.dismiss(filterData);
  }

  // Update the selected filter category when changed.
  onFilterCategoryChange(category: "spentOn" | "type" | "duration"): void {
    this.filterCategory = category;
    // Reset option if category changes.
    if (category === "spentOn") {
      this.selectedOption = "self";
    } else if (category === "type") {
      this.selectedOption = this.expenseTypeOptions[0]?.value || "";
    }
  }

  onDurationChange(value: string): void {
    this.selectedDuration = value;
    // When custom is selected, clear fromDate/toDate.
    if (value !== "custom") {
      this.fromDate = "";
      this.toDate = "";
    } else {
      this.fromDate = new CustomDate().getThisMonth() ?? "";
      this.toDate = this.dateToday ?? "";
    }
  }

  // Load stored filter data if available
  loadDefaultFilters(): void {
    const stored = localStorage.getItem("expenseFilters");
    if (stored) {
      try {
        const savedFilters: FilterData = JSON.parse(stored);
        this.filterCategory = savedFilters.filterCategory as "spentOn" | "type" | "duration";
        if (this.filterCategory === "spentOn" || this.filterCategory === "type") {
          this.selectedOption = savedFilters.parameter || (this.filterCategory === "spentOn" ? "self" : "");
        }
        if (savedFilters.duration) {
          this.selectedDuration = savedFilters.duration;
        }
        if (savedFilters.customRange) {
          this.fromDate = savedFilters.customRange.start;
          this.toDate = savedFilters.customRange.end;
          this.selectedDuration = "custom";
        }
      } catch (error) {
        console.error("Error parsing stored filter data", error);
      }
    } else {
      // fallback defaults
      this.filterCategory = "spentOn";
      this.selectedOption = "self";
      this.selectedDuration = this.weekBackDate ?? "";
    }
  }

  cancelFilter(): void {
    this.cancel.emit();
  }
}

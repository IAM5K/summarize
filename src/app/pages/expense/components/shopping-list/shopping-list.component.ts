import { Component, OnInit } from "@angular/core";
import { AlertRadioOptions } from "src/app/models/interface/masterData.model";
import { ToasterService } from "src/app/services/toaster/toaster.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"],
})
export class ShoppingListComponent implements OnInit {
  pageTitle = "Shopping list";

  constructor(private toaster: ToasterService) {}
  examOptions: AlertRadioOptions[] = [];
  shoppingList: any = [
    {
      name: "Summarize",
      date: "2024-08-09",
      quantity: "1",
      price: "11",
      isActive: true,
    },
  ];
  alertButtons = [
    {
      text: "Cancel",
      role: "cancel",
    },
    {
      text: "Submit",
      role: "confirm",
      handler: (value: object) => {
        if (value) {
          this.addShoppingItems(value);
        } else {
          this.toaster.showToast("Submitted without selection", "danger");
        }
      },
    },
  ];
  public shoppingInputs = [
    {
      placeholder: "Item name",
    },
    {
      type: "date",
      placeholder: "Purchase by",
    },
    {
      type: "number",
      placeholder: "Quantity",
      min: 1,
      max: 100,
    },
    {
      type: "number",
      placeholder: "Expected price",
      min: 0,
    },
  ];
  ngOnInit() {
    this.getShoppingList();
  }

  getShoppingList() {}

  addShoppingItems(value) {
    const data = {
      name: Object.values(value)[0].toString(),
      date: Object.values(value)[1].toString(),
      quantity: Object.values(value)[2],
      price: Object.values(value)[3],
      isActive: true,
    };
    console.log(data);
    this.shoppingList.push(data);
  }

  updateShoppingItem(value) {}
  deleteShoppingItem(value) {}
}

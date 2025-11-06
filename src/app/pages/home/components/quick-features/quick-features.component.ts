import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-quick-features",
    templateUrl: "./quick-features.component.html",
    styleUrls: ["./quick-features.component.scss"],
    standalone: false
})
export class QuickFeaturesComponent implements OnInit {
  phoneNumber: string = "";
  countryCode: string = "+91";

  constructor() {}

  ngOnInit() {}

  openWhatsAppLink() {
    if (this.phoneNumber) {
      const url = `https://wa.me/${this.countryCode}${this.phoneNumber}`;
      window.open(url, "_blank");
    } else {
      alert("Please enter a valid mobile number.");
    }
  }
}

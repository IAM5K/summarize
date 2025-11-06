import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-practice-test",
    templateUrl: "./practice-test.component.html",
    styleUrls: ["./practice-test.component.scss"],
    standalone: false
})
export class PracticeTestComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Practice component");

  }

}

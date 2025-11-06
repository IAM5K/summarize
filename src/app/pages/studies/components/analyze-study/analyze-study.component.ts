import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-analyze-study",
    templateUrl: "./analyze-study.component.html",
    styleUrls: ["./analyze-study.component.scss"],
    standalone: false
})
export class AnalyzeStudyComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("initialized Analyze study");

  }

}

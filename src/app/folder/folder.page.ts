import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-folder",
    templateUrl: "./folder.page.html",
    styleUrls: ["./folder.page.scss"],
    standalone: false
})
export class FolderPage implements OnInit {
  public folder: any;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get("id");
  }
}

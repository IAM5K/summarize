import { Component, OnInit } from "@angular/core";
import { SeoTags } from "src/app/models/class/seoTags/seo";
import { SeoService } from "src/app/services/seo/seo.service";

@Component({
  selector: "app-help",
  templateUrl: "./help.page.html",
  styleUrls: ["./help.page.scss"],
})
export class HelpPage implements OnInit {
  pageTitle="Help & Support"

  title= SeoTags.pageTitle.helpPage
  pageMetaTags= SeoTags.helpPageTags
  constructor(
    private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.seo(this.title,this.pageMetaTags)
  }

}

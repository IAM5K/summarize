import { Injectable } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { GoogleTagManagerService } from "angular-google-tag-manager";

@Injectable({
  providedIn: "root",
})
export class SeoService {
  constructor(
    private titleService: Title,
    private metaTags: Meta,
    private gtmService: GoogleTagManagerService,
  ) {}

  seo(pageTitle: any, metaTag: any) {
    this.titleService.setTitle(pageTitle);
    metaTag.forEach((tag: any) => {
      this.metaTags.updateTag(tag);
    });
  }

  eventTrigger(eventName: string, pageName: string) {
    const gtmTag = {
      event: eventName,
      pageName: pageName,
    };
    console.log("pushing analytics from seo:", gtmTag);

    this.gtmService.pushTag(gtmTag);
  }
}

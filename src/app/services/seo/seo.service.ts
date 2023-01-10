import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private titleService: Title,
    private metaTags: Meta,
    private gtmService: GoogleTagManagerService
  ) { }

  seo(pageTitle: any, metaTag: any) {
    this.titleService.setTitle(pageTitle)
    this.metaTags.addTags(metaTag)
  }

  eventTrigger(eventName: string, pageName: string) {
    const gtmTag = {
      event: eventName,
      pageName: pageName
    };
    this.gtmService.pushTag(gtmTag);
  }
}

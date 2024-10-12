import { AfterViewInit, Component, OnInit } from "@angular/core";
import { features as MasterDataFeatures } from "src/app/models/class/masterData/master-data";
import { SeoService } from "src/app/services/seo/seo.service";
import { RealTimeDataBaseService } from "src/app/shared/db/real-time-data-base.service";
import { homePageTags, homePageTitle } from "src/app/models/data/seo-tags";
import { NotificationsService } from "src/app/services/notifications/notifications.service";
import { fabActionButtonsAtHome, homePageParagraphs } from "src/app/models/data/home-page.data";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit, AfterViewInit {
  pageTitle = "Home";
  title = homePageTitle;
  pageMetaTags = homePageTags;
  features = MasterDataFeatures;
  fabActionButtons = fabActionButtonsAtHome;
  paragraphs = homePageParagraphs;
  homeData: any;
  constructor(
    private seoService: SeoService,
    private notificationsService: NotificationsService,
    private rtdb: RealTimeDataBaseService,
  ) {}

  ngOnInit() {
    this.seoService.seo(this.title, this.pageMetaTags);
    this.notificationsService.schedule9PMNotification();
    console.log("meta tag updated, moving to after init");
  }

  ngAfterViewInit(): void {
    console.log("Executing after view init");
    this.getAboutParagraphs();
    this.seoService.eventTrigger("page_view", this.title);
  }
  getAboutParagraphs(): void {
    this.rtdb.getHomeData("paragraphs").subscribe((data) => {
      const paragraphsFetched = data;
      if (paragraphsFetched.length > 0) {
        this.paragraphs = paragraphsFetched.map((element) => element.content);
      }
    });
  }

  testNotification() {
    const now = new Date();
    now.setMinutes(now.getMinutes()); // Set notification for 1 minute from now
    this.notificationsService.scheduleInstantNotification();
  }
}

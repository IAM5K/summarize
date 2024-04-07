import { AfterViewInit, Component, OnInit } from "@angular/core";
import { features as MasterDataFeatures } from "src/app/models/class/masterData/master-data";
import { SeoService } from "src/app/services/seo/seo.service";
import { RealTimeDataBaseService } from "src/app/shared/db/real-time-data-base.service";
import { homePageTags, homePageTitle } from "src/app/models/data/seo-tags";
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
  fabActionButtons = [
    { title: "Goal", color: "secondary", url: "/goal", icon: "bulb" },
    { title: "Expenses", color: "success", url: "/expenses", icon: "cash" },
    { title: "Studies", color: "primary", url: "/studies", icon: "book" },
    { title: "Time", color: "danger", url: "/time", icon: "hourglass" },
  ];
  paragraphs = [
    "Summarize is an app that helps you to manage your Time, Money, and work which includes but is not limited to subject-wise studies, notes, to-do's, or office works.",
    "Thinking when to use Summarize? To live better and managed, one should recall what they have done throughout the day daily before sleep . Also listing tasks for the next day and setting priorities increases the chances to get them done.",
    "Currently, Summarize is under development, we will keep on adding features one by one. Till then, please feel free to manage Achievements of day, Expenses, Studies, and Time. It is a web-app that can be easily installed on all devices ( Mobile & PC ). Install the app on your devices  to keep in sync and to check how to install visit our Help page.",
    "Note: Your data will not be used for any advertisement or offering any deal/scheme. Also our app don't need any permission to work on your device. Your privacy is important to us. For more queries, you can contact us through the support page. We are also open to feature requests and suggestions.",
  ];
  homeData: any;
  constructor(
    private seoService: SeoService,
    private rtdb: RealTimeDataBaseService,
  ) {}

  ngOnInit() {
    this.seoService.seo(this.title, this.pageMetaTags);
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
      console.log(this.paragraphs);
    });
  }
}

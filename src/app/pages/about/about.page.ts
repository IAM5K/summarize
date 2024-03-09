import { Component, OnInit } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { CustomDate } from "src/app/models/class/date/custom-date";
import { SeoTags } from "src/app/models/class/seoTags/seo";
import { SeoService } from "src/app/services/seo/seo.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.page.html",
  styleUrls: ["./about.page.scss"],
})
export class AboutPage implements OnInit {
  pageTitle="About Summarize"
  title = SeoTags.pageTitle.aboutPage;
  pageMetaTags= SeoTags.aboutPageTags;
  paragraphs=[
    "Summarize is an app that helps you to manage your Time, Money, and work which includes but is not limited to subject-wise studies, notes, to-do's, or office works.",
    "It will also help you to analyze your expenditure of resources and will suggest approaches to manage them in a better way. You may find many more apps on the internet that announces to help you manage resource and increase your savings but ends up increasing your expenses by using your data to show relevant ads or offering some tempting deals.",
    "Thinking when to use Summarize? To live better and managed, one should recall what they have done throughout the day daily before sleep . Also listing tasks for the next day and setting priorities increases the chances to get them done.",
    "Currently, Summarize is under development, we will keep on adding features one by one. Till then, please feel free to manage Achievements of day, Expenses, Studies, and Time. It is a web-app that can be easily installed on all devices ( Mobile & PC ). Install the app on your devices  to keep in sync and to check how to install visit our Help page.",
    "Note: Your data will not be used for any advertisement or offering any deal/scheme. Also our app don't need any permission to work on your device. Your privacy is important to us. For more queries, you can contact us through the support page. We are also open to feature requests and suggestions."
  ]
  lastUpdateOn:any=null;
  infoNote="";
  dateToday = new CustomDate().getDateToday();
  releaseDetails =[
    {
      type:"Feature",
      date:"17-02-2024",
      version:"d.4.6"
    },
    {
      type:"Last Patch",
      date:"01-11-2023",
      version:"p.3.5"
    },
    {
      type:"Latest Patch",
      date:"21-02-2024",
      version:"p.3.7"
    }
  ]
  constructor(
    private swUpdate: SwUpdate,
    private seoService: SeoService
    ) { }

  ngOnInit() {
    this.seoService.seo(this.title,this.pageMetaTags)
    this.lastUpdateOn=localStorage.getItem("lastUpdateOn")
    this.swUpdate.versionUpdates.subscribe(()=>{
      this.infoNote ="Checking for update..."
      if(confirm("Update Available, do you want to install it?") && this.lastUpdateOn !== this.dateToday){
        window.location.reload();
        this.infoNote="Updated."
      }
    })
  }

  checkForUpdate(){
    this.lastUpdateOn = (new Date().getFullYear()) + "-0" + (new Date().getMonth() + 1) + "-" + (new Date().getDate());
    localStorage.setItem("lastUpdateOn",this.lastUpdateOn)
    let updateCount=0
    this.swUpdate.versionUpdates.subscribe(()=>{
      this.infoNote ="Checking for update..."
      if(confirm("Update Available, do you want to install it?") && updateCount<3){
        updateCount = updateCount+1;
        window.location.reload();
        this.infoNote="Updated."
      }
    })
  }

}

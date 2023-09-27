import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MasterData } from 'src/app/models/class/masterData/master-data';
import { SeoTags } from 'src/app/models/class/seoTags/seo';
import { Goal } from 'src/app/models/interface/masterData.model';
import { GoalService } from 'src/app/services/goal/goal.service';
import { SeoService } from 'src/app/services/seo/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit,OnDestroy {
  pageTitle = "Home"
  title = SeoTags.pageTitle.homePage
  pageMetaTags = SeoTags.homePageTags;
  features = MasterData.features
  dailyGoals: any = []
  private goalSubscription!:Subscription;
  paragraphs = [
    "Summarize is an app that helps you to manage your Time, Money, and work which includes but is not limited to subject-wise studies, notes, to-do's, or office works.",
    "Thinking when to use Summarize? To live better and managed, one should recall what they have done throughout the day daily before sleep . Also listing tasks for the next day and setting priorities increases the chances to get them done.",
    "Currently, Summarize is under development, we will keep on adding features one by one. Till then, please feel free to manage Achievements of day, Expenses, Studies, and Time. It is a web-app that can be easily installed on all devices ( Mobile & PC ). Install the app on your devices  to keep in sync and to check how to install visit our Help page.",
    "Note: Your data will not be used for any advertisement or offering any deal/scheme. Also our app donot need any permission to work on your device. Your privacy is important to us. For more queries, you can contact us through the support page. We are also open to feature requests and suggestions."
  ]
  constructor(
    private seoService: SeoService,
    private goalService: GoalService
  ) { }

  ngOnInit() {
    this.seoService.seo(this.title, this.pageMetaTags);
    // this.getGoal()
  }
  ngAfterViewInit() {
    // this.getGoal()
  }

  async getGoal() {
    this.goalSubscription= await this.goalService.getGoal().subscribe((res:any) => {
      console.log(res);
      this.dailyGoals = res
    })
  }
  ngOnDestroy(){
    console.log("Home page Destroyed")
    // this.goalSubscription.unsubscribe();
  }
}

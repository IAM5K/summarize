import { seoMetaTag } from "../../interface/masterData.model";

export class SeoTags {
  public static pageTitle:any={
    homePage:"Summarize : Record, Analyse and Rise | Dashboard",
    loginPage:"Login | Sign up now and stay organized with Summarize",
    aboutPage:"About Summarize : What it is? Why and How to use?",
    helpPage:"Need Help to install Summarize | Reach out to us | FAQ",
    goalPage:"Create Goals, manage and acheive them with consistency"
  }
  public static homePageTags: seoMetaTag[] = [
    {
      name:'description',
      content:"Summarize (summarize-ng web app) help users manage their achievements, money, time, and studies effectively. Install on any device and boost your productivity."
    },
    {
      name:'keywords',
      content:'Summarize, summarize-ng, Money management, Budgeting, Financial goals, Expense tracking, Time management, Study management, Productivity, Goal setting, Organizational tools, Personal finance, Study planner, Study materials, Study schedule, Study progress, Study tracker, Study management app'
    }
  ];
  public static aboutPageTags: seoMetaTag[] = [
    {
      name:'description',
      content:"Tempting advertisement and deals makes you to spend more money and time to purchase and use their product/service. Summarize helps you in managing acheivement, studies, expenses, time and spend only on needs for better savings."
    },
    {
      name:'keywords',
      content:'Summarize, summarize-ng, Money management, Budgeting, Financial goals, Expense tracking, Time management, Study management, Productivity, Goal setting, Organizational tools, Personal finance, Study planner, Study materials, Study schedule, Study progress, Study notes, Study reminders, Study rewards, Study reports, Study tracker, Study management app'
    }
  ];
  public static helpPageTags: seoMetaTag[] = [
    {
      name:'description',
      content:"Need help to install Summarize (summarize-ng.web.app) on PC ( Windows / MAC / Linux all-dostro ),Install on Android, Install on IOS, Update Summarize."
    },
    {
      name:'keywords',
      content:'Summarize, summarize-ng , time management, money managemnet, expense management, study assistant , digital dairy,iam5k, IAM5K, Sandeep Kumar'
    }
  ];
  public static loginPageTags: seoMetaTag[] = [
    {
      name:'description',
      content:"Login or Sign up now to Summarize (summarize-ng.web.app) now. With its user-friendly interface and secure login, Simplify time, money, achievement, and study management. Easily track progress, set goals, and stay organized. "
    },
    {
      name:'keywords',
      content:'Summarize, Summarize, arise, arize, money managemnet, expense management, cost analysis,summarize-ng, summarize-ng, digital dairy, expense analysis'
    }
  ];
}

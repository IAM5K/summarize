import { seoMetaTag } from "../../interface/masterData.model";

export class SeoTags {
  public static pageTitle: any = {
    homePage: "Summarize : Record, Analyze and Rise | Dashboard",
    loginPage: "Login | Sign up now and stay organized with Summarize",
    aboutPage: "About Summarize : What it is? Why and How to use?",
    helpPage: "Need Help to install Summarize | Reach out to us | FAQ",
    goalPage: "Create Goals, manage and achieve them with consistency",
    studiesPage: "",
    timePage: "Log, Analyze and Manage your time effectively",
  };
  public static homePageTags: seoMetaTag[] = [
    {
      name: "description",
      content:
        "Summarize is a powerful personal management tool designed to help users track achievements, manage finances, optimize time, and organize studies. Boost productivity effortlessly across all devices. summarize-ng.web.app",
    },
    {
      name: "keywords",
      content:
        "personal management, productivity tool, finance tracker, budgeting app, time management, study planner, goal tracking, task organization, achievement tracker, expense tracker, study management, Summarize app, summarize-ng",
    },
  ];

  public static aboutPageTags: seoMetaTag[] = [
    {
      name: "description",
      content:
        "Summarize helps you take control of your time, finances, and studies. Avoid unnecessary expenses, track progress, and achieve your goals with our efficient management system.",
    },
    {
      name: "keywords",
      content:
        "Summarize, financial planning, smart budgeting, expense tracker, study organizer, time management app, productivity tools, savings planner, study progress tracker, personal development, goal setting",
    },
  ];

  public static helpPageTags: seoMetaTag[] = [
    {
      name: "description",
      content:
        "Get step-by-step help to install Summarize on Windows, Mac, Linux, Android, and iOS. Learn how to update and optimize your experience for seamless productivity.",
    },
    {
      name: "keywords",
      content:
        "Summarize installation, install on PC, install on Mac, install on Android, install on iOS, software update, troubleshooting, productivity app setup, digital planner, time management assistant",
    },
  ];

  public static loginPageTags: seoMetaTag[] = [
    {
      name: "description",
      content:
        "Sign up or log in to Summarize and take charge of your time, finances, and study plans. Secure, easy-to-use, and designed for maximum productivity.",
    },
    {
      name: "keywords",
      content:
        "Summarize login, productivity app, account access, personal finance tracker, digital planner, goal tracking, secure login, time and money management, study tracker",
    },
  ];

  public static studiesPageTags: seoMetaTag[] = [
    {
      name: "description",
      content:
        "Summarize makes study management easy. Organize materials, track progress, and optimize your learning experience with our intuitive study planner.",
    },
    {
      name: "keywords",
      content:
        "study planner, learning management, education tools, study schedule, academic progress tracker, student productivity, time optimization, digital notebook, study assistant",
    },
  ];

  public static timePageTags: seoMetaTag[] = [
    {
      name: "description",
      content:
        "Optimize your time with Summarize. Prioritize tasks, track productivity, and manage schedules effectively for a balanced work and study life.",
    },
    {
      name: "keywords",
      content:
        "time management, productivity tracker, schedule planner, task prioritization, daily planner, efficiency tools, work-life balance, time tracking app, organization tools",
    },
  ];

  public static profilePageTags: seoMetaTag[] = [
    {
      name: "description",
      content:
        "Track and analyze your expenses with Summarize. Gain insights into your spending habits and learn how to save more efficiently. Finance tips coming soon!",
    },
    {
      name: "keywords",
      content:
        "expense tracker, budgeting app, personal finance, cost analysis, money management, financial insights, digital expense log, savings planner, spending tracker",
    },
    {
      name: "author",
      content: "Sandeep Kumar",
    },
  ];

  public static expensePageTags: seoMetaTag[] = [
    {
      name: "description",
      content:
        "Monitor your spending with Summarize. Easily categorize expenses, track trends, and make informed financial decisions for a more secure future.",
    },
    {
      name: "keywords",
      content:
        "expense management, money tracker, budgeting software, financial planning, spending analysis, cost control, personal finance app, financial goals",
    },
  ];

  public static goalPageTags: seoMetaTag[] = [
    {
      name: "description",
      content:
        "Set, track, and achieve your goals with Summarize. Stay focused, monitor progress, and develop better financial and personal habits for long-term success.",
    },
    {
      name: "keywords",
      content:
        "goal setting, achievement tracker, productivity goals, financial goals, personal growth, time management, success planning, milestone tracking, habit building",
    },
  ];
}

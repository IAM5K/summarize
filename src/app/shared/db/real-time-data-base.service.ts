import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RealTimeDataBaseService {
  dashboardContent = "/dynamic-content/dashboard";
  constructor(private db: AngularFireDatabase) {}

  getDashboardContent(): Observable<any> {
    return this.db.list<any>(this.dashboardContent).valueChanges();
  }

  addTemporaryData(): Promise<void> {
    const paragraphs = [
      "Summarize is an app that helps you to manage your Time, Money, and work which includes but is not limited to subject-wise studies, notes, to-do's, or office works.",
      "Thinking when to use Summarize? To live better and managed, one should recall what they have done throughout the day daily before sleep . Also listing tasks for the next day and setting priorities increases the chances to get them done.",
      "Currently, Summarize is under development, we will keep on adding features one by one. Till then, please feel free to manage Achievements of day, Expenses, Studies, and Time. It is a web-app that can be easily installed on all devices ( Mobile & PC ). Install the app on your devices  to keep in sync and to check how to install visit our Help page.",
      "Note: Your data will not be used for any advertisement or offering any deal/scheme. Also our app donot need any permission to work on your device. Your privacy is important to us. For more queries, you can contact us through the support page. We are also open to feature requests and suggestions.",
    ];
    const paragraphsData = paragraphs.map((paragraph, index) => {
      return {
        content: paragraph,
        orderId: index + 1,
        type: "text", // or 'note' based on your condition
      };
    });

    return this.db.object("dynamicContent/home/paragraphs").set(paragraphsData);
  }

  getHomeData(): Observable<any> {
    return this.db.object("dynamicContent/home").valueChanges();
  }
}

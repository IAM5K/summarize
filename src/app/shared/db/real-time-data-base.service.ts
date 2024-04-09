import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class RealTimeDataBaseService {
  private readonly CACHE_KEY = "examsList";
  private examsList: any[] = [];
  dashboardContent = "/dynamic-content/dashboard";
  constructor(private db: AngularFireDatabase) {
    // Load cached data from localStorage on service initialization
    const cachedData = localStorage.getItem(this.CACHE_KEY);
    if (cachedData) {
      this.examsList = JSON.parse(cachedData);
    }
  }

  getDashboardContent(): Observable<any> {
    return this.db.list<any>(this.dashboardContent).valueChanges();
  }

  // addTemporaryData(): Promise<void> {
  //   const paragraphs = [ ];
  // add data and processing logic.
  //   return this.db.object("dynamicContent/dashboard/paragraphs").set(paragraphsData);
  // }

  getHomeData(path: string): Observable<any> {
    return this.db.object(`dynamicContent/dashboard/${path}`).valueChanges();
  }

  getAboutData(path: string): Observable<any> {
    return this.db.object(`dynamicContent/about/${path}`).valueChanges();
  }

  // getTargetExam(): Observable<any> {
  //   return this.db.object("targetExams").valueChanges();
  // }

  getTargetExam(): Observable<any> {
    // Check if data is available in cache
    if (this.examsList.length > 0) {
      console.log("return from cache ");
      return of(this.examsList); // Return cached data
    } else {
      // Fetch data from Firebase Realtime Database
      return this.db
        .object("targetExams")
        .valueChanges()
        .pipe(
          tap((data) => {
            console.log("stored exam list in cache ");
            this.examsList = data; // Store data in cache
            // Update localStorage with the new data
            localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
          }),
        );
    }
  }
}

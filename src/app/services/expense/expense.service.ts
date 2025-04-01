import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ProfileService } from "../profile/profile.service";
import { ToasterService } from "../toaster/toaster.service";
import { Expense } from "src/app/models/interface/masterData.model";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ExpenseService {
  constructor(
    private afs: AngularFirestore,
    private profileService: ProfileService,
    private toasterService: ToasterService,
  ) {}
  analyzeExpense: Expense[];
  userId = this.profileService.getUserProfile()?.uid;
  successMessage = "Expense Added Successfully!";
  deletedMessage = "Expense Deleted Successfully!";
  expenseCollection = this.afs.collection("userData");

  private analysisDataSubject = new BehaviorSubject<Expense[]>([]);
  analysisData$ = this.analysisDataSubject.asObservable();

  setAnalysisData(expenses: Expense[]) {
    if (!expenses) {
      this.toasterService.showToast("No expense data available", "warning");
      return;
    }
    this.analysisDataSubject.next(expenses);
  }

  clearAnalysisData() {
    this.analysisDataSubject.next([]);
  }

  addExpense(data: any) {
    this.expenseCollection
      .doc(this.userId)
      .collection("myExpence")
      .add(data)
      .then((res) => {
        this.successAlert(this.successMessage);
      })
      .catch((err) => {
        alert("There was an error in posting. \n Please try again later. Check console for detail.");
        console.warn(err);
      });
  }

  getExpenses(count?: number) {
    const collectionRef = this.expenseCollection
      .doc(this.userId)
      .collection("myExpence", (ref) =>
        count ? ref.orderBy("date", "desc").limit(count) : ref.orderBy("date", "desc"),
      );
    return collectionRef.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Expense;
          const idField = a.payload.doc.id;
          return { ...data, idField };
        }),
      ),
    );
  }

  getCustomExpenses(filterQuery: any) {
    const collectionRef = this.expenseCollection.doc(this.userId).collection("myExpence", (ref) => {
      let queryRef = ref.orderBy("date", "desc");

      // Date filtering
      if (filterQuery.customRange) {
        // For custom date range
        queryRef = queryRef
          .where("date", ">=", filterQuery.customRange.start)
          .where("date", "<=", filterQuery.customRange.end);
      } else if (filterQuery.duration) {
        // For predefined durations
        queryRef = queryRef.where("date", ">=", filterQuery.duration);
      }

      // Category filtering
      if (filterQuery.filterCategory === "spentOn" && filterQuery.parameter) {
        queryRef = queryRef.where("spendedOn", "==", filterQuery.parameter);
      } else if (filterQuery.filterCategory === "type" && filterQuery.parameter) {
        queryRef = queryRef.where("type", "==", filterQuery.parameter);
      }

      return queryRef;
    });

    return collectionRef.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Expense;
          const idField = a.payload.doc.id;
          return { ...data, idField };
        }),
      ),
    );
  }

  getExpenseByDate(date: string) {
    const collectionRef = this.expenseCollection
      .doc(this.userId)
      .collection("myExpence", (ref) => ref.where("date", "==", date).orderBy("amount", "asc"));
    return collectionRef.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Expense;
          const idField = a.payload.doc.id;
          return { ...data, idField };
        }),
      ),
    );
  }

  async updateExpense(data, idField) {
    try {
      await this.expenseCollection.doc(this.userId).collection("myExpence").doc(idField).update(data);
      this.successAlert("Expense updated successfully");
      return true;
    } catch (error) {
      this.toasterService.showToast("Error updating expense. Please try again.", "danger");
      return false;
    }
  }
  deleteExpense(idField: string) {
    this.expenseCollection
      .doc(this.userId)
      .collection("myExpence")
      .doc(idField)
      .delete()
      .then(() => {
        this.successAlert(this.deletedMessage);
      })
      .catch((err) => {
        alert(err);
      });
  }
  async successAlert(message: string) {
    this.toasterService.showToast(message, "success");
  }

  getBudget() {
    return this.expenseCollection
      .doc(this.userId)
      .collection("myBudget", (ref) => ref.orderBy("month", "desc"))
      .valueChanges({ idField: "idField" });
  }
  addBudget(data: any) {
    this.expenseCollection
      .doc(this.userId)
      .collection("myBudget")
      .add(data)
      .then((res) => {
        const msg = "Budget Added Successfully!";
        this.successAlert(msg);
      })
      .catch((err) => {
        const message =
          "There was an error in posting.\n Please try again later. Check console for detail. \nContact /report us in case of no success ";
        this.toasterService.showToast(message, "warning");
        console.warn(err);
      });
  }

  updateBudget(data: any) {
    this.expenseCollection
      .doc(this.userId)
      .collection("myBudget")
      .doc(data.idField)
      .update(data)
      .then((res) => {
        const msg = "Budget updated successfully!";
        this.successAlert(msg);
      })
      .catch((err) => {
        const message =
          "There was an error in updating budget. \n Please try again later. Check console for detail. \nContact /report us in case of no success ";
        this.toasterService.showToast(message, "warning");
        alert();
        console.warn(err);
      });
  }
}

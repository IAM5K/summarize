import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AlertController } from "@ionic/angular";
import { ProfileService } from "../profile/profile.service";
import { FirebaseService } from "../firebase/firebase.service";
import { ToasterService } from "../toaster/toaster.service";
import { IGoalData } from "src/app/models/interface/goals.interface";

@Injectable({
  providedIn: "root",
})
export class GoalService {
  constructor(
    private afs: AngularFirestore,
    public fs: FirebaseService,
    private alertCtrl: AlertController,
    private profileService: ProfileService,
    private toasterService: ToasterService,
  ) {}

  addMessage = "Goal added successfully.";
  updateMessage = "Goal updated successfully.";
  deletedMessage = "Goal has been successfully deleted.";
  goalCollection = this.afs.collection("userGoals");

  getGoal() {
    const userId = this.fs.userData.uid;
    return this.goalCollection.doc(userId).collection("myGoal").valueChanges({ idField: "idField" });
  }

  getDailyGoal() {
    const userId = this.fs.userData.uid;
    return this.goalCollection
      .doc(userId)
      .collection("dailyGoals", (ref) => ref.orderBy("gTerm").orderBy("date", "asc").where("gTerm", "==", "Daily"))
      .valueChanges({ idField: "idField" });
  }

  getPriorityGoal() {
    const userId = this.fs.userData.uid;
    return this.goalCollection
      .doc(userId)
      .collection("priorityGoals", (ref) => ref.orderBy("gTerm").orderBy("date", "asc").where("gTerm", "!=", "Daily"))
      .valueChanges({ idField: "idField" });
  }

  async addGoal(data: IGoalData) {
    const goalTerm = data.gTerm === "Daily" ? "dailyGoals" : "priorityGoals";
    const userId = this.fs.userData.uid;
    if (!userId) {
      console.error("User ID is not available");
      this.toasterService.showToast("User ID is not available, check if you are logged in.", "danger");
      return;
    }
    await this.goalCollection
      .doc(userId)
      .collection(goalTerm)
      .add(data)
      .then((_res) => {
        this.toasterService.showToast(this.addMessage, "success");
      })
      .catch((err) => {
        alert("There was an error in posting. \n Please try again later. Check console for detail.");
        console.warn(err);
      });
  }

  async updateGoal(data: IGoalData, idField: string) {
    try {
      const userId = this.fs.userData.uid;
      const goalTerm = data.gTerm === "Daily" ? "dailyGoals" : "priorityGoals";
      delete data.idField;
      await this.goalCollection.doc(userId).collection(goalTerm).doc(idField).update(data);
      this.toasterService.showToast(this.updateMessage, "success");
    } catch (error) {
      console.error("Error updating goal:", error);
      this.toasterService.showToast("Error updating goal", "danger");
    }
  }

  async updateDailyGoal(data: IGoalData, idField: string) {
    try {
      const userId = this.fs.userData.uid;
      const goalTerm = data.gTerm === "Daily" ? "dailyGoals" : "priorityGoals";
      delete data.idField;
      await this.goalCollection.doc(userId).collection(goalTerm).doc(idField).update(data);
      this.toasterService.showToast(this.updateMessage, "success");
    } catch (error) {
      console.error("Error updating goal:", error);
      this.toasterService.showToast("Error updating goal", "danger");
    }
  }

  deleteGoal(data: any, idField: string) {
    const userId = this.fs.userData.uid;
    const goalTerm = data.gTerm === "Daily" ? "dailyGoals" : "priorityGoals";
    this.goalCollection
      .doc(userId)
      .collection(goalTerm)
      .doc(idField)
      .delete()
      .then(() => {
        this.toasterService.showToast(this.deletedMessage, "danger");
      })
      .catch((err: Error) => {
        alert(err);
      });
  }

  async markGoalAsCompleted(goalId: string) {
    try {
      const userId = this.fs.userData.uid;
      const goalRef = this.goalCollection.doc(userId).collection("dailyGoals").doc(goalId);
      const goal = await goalRef.get().toPromise();

      if (goal.exists) {
        const data = goal.data();
        const completedGoalData = {
          ...data,
          completedOn: new Date(),
        };

        let goalTerm: string;
        switch (data["gTerm"]) {
          case "Daily":
            goalTerm = "completedGoals";
            break;
          case "Short-term":
            goalTerm = "completedShortTermGoals";
            break;
          default:
            break;
        }

        await this.goalCollection.doc(userId).collection(goalTerm).doc(goalId).set(completedGoalData);
        await goalRef.delete();
        this.toasterService.showToast("Goal marked as completed", "success");
      } else {
        console.error("Goal does not exist");
        this.toasterService.showToast("Goal does not exist", "danger");
      }
    } catch (error) {
      console.error("Error marking goal as completed:", error);
      this.toasterService.showToast("Error marking goal as completed", "danger");
    }
  }

  async markGoalAsUncompleted(goalId: string) {
    try {
      const userId = this.fs.userData.uid;
      const completedGoalRef = this.goalCollection.doc(userId).collection("completedGoals").doc(goalId);
      const completedGoal = await completedGoalRef.get().toPromise();

      if (completedGoal.exists) {
        const data = completedGoal.data();
        const uncompletedGoalData = {
          ...data,
          completedOn: null,
        };

        let originalGoalTerm: string;
        switch (data["gTerm"]) {
          case "Daily":
            originalGoalTerm = "dailyGoals";
            break;
          case "Short-term":
            originalGoalTerm = "shortTermGoals";
            break;
          default:
            break;
        }

        await this.goalCollection.doc(userId).collection(originalGoalTerm).doc(goalId).set(uncompletedGoalData);
        await completedGoalRef.delete();
        this.toasterService.showToast("Goal marked as uncompleted", "success");
      } else {
        console.error("Completed goal does not exist");
        this.toasterService.showToast("Completed goal does not exist", "danger");
      }
    } catch (error) {
      console.error("Error marking goal as uncompleted:", error);
      this.toasterService.showToast("Error marking goal as uncompleted", "danger");
    }
  }
}

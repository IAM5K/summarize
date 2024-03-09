import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AlertController } from "@ionic/angular";
import { ProfileService } from "../profile/profile.service";
import { FirebaseService } from "../firebase/firebase.service";
import { ToasterService } from "../toaster/toaster.service";
import { GoalData } from "src/app/models/interface/goals.interface";
import { serverTimestamp } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class GoalService {
  constructor(
    private afs: AngularFirestore,
    private alertCtrl: AlertController,
    private fs: FirebaseService,
    private profileService: ProfileService,
    private toasterService: ToasterService
  ) {}

  addMessage = "Goal added successfully.";
  updateMessage = "Goal updated successfully.";
  deletedMessage = "Goal has been successfully deleted.";
  // userId = this.profileService.getUserProfile()?.uid;
  goalCollection = this.afs.collection("userGoals");

  getGoal() {
    const userId = this.fs.userData.uid;
    // console.log(userId);
    return this.goalCollection
      .doc(userId)
      .collection("myGoal")
      .valueChanges({ idField: "idField" });
  }
  getDailyGoal() {
    const userId = this.fs.userData.uid;
    // console.log('getting priority goals for: ', userId);
    return this.goalCollection
      .doc(userId)
      .collection("dailyGoals", (ref) =>
        ref
          .orderBy("gTerm")
          .orderBy("date", "asc")
          .where("gTerm", "==", "Daily")
      )
      .valueChanges({ idField: "idField" });
  }
  getPriorityGoal() {
    const userId = this.fs.userData.uid;
    // console.log('getting priority goals for: ', userId);
    return this.goalCollection
      .doc(userId)
      .collection("priorityGoals", (ref) =>
        ref
          .orderBy("gTerm")
          .orderBy("date", "asc")
          .where("gTerm", "!=", "Daily")
      )
      .valueChanges({ idField: "idField" });
  }

  addGoal(data: GoalData) {
    // console.log(data);
    const goalTerm = data.gTerm === "Daily" ? "dailyGoals" : "priorityGoals";
    const userId = this.fs.userData.uid;
    this.goalCollection
      .doc(userId)
      .collection(goalTerm)
      .add(data)
      .then((res) => {
        // console.log(res);
        this.toasterService.showToast(this.addMessage, "success");

      })
      .catch((err) => {
        alert(
          "There was an error in posting. \n Please try again later. Check console for detail."
        );
        console.warn(err);
      });
  }

  async updateGoal(data: GoalData, idField: string) {
    try {
      const userId = this.fs.userData.uid;
      const goalTerm = data.gTerm === "Daily" ? "dailyGoals" : "priorityGoals";
      delete data.idField;
      // console.log(data);
      await this.goalCollection
        .doc(userId)
        .collection(goalTerm)
        .doc(idField)
        .update(data);
      this.toasterService.showToast(this.updateMessage, "success");
    } catch (error) {
      console.error("Error updating goal:", error);
      this.toasterService.showToast("Error updating goal", "danger");
    }
  }

  async updateDailyGoal(data: GoalData, idField: string) {
    try {
      const userId = this.fs.userData.uid;
      const goalTerm = data.gTerm === "Daily" ? "completedGoals" : "priorityGoals";
      delete data.idField;
      // console.log(data);
      await this.goalCollection
        .doc(userId)
        .collection(goalTerm)
        .doc(idField)
        .update(data);
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
        this.toasterService.showToast(this.deletedMessage,"danger");
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
          completedOn: new Date(), // Set completedOn to current date
        };
  
        // Determine the collection based on gTerm
        let goalTerm: string;
        switch (data["gTerm"]) {
          case "Daily":
            goalTerm = "completedGoals";
            break;
          case "Short-term":
            goalTerm = "completedShortTermGoals";
            break;
          // Add cases for other gTerm values as needed
          default:
            // Handle default case (if any)
            break;
        }
  
        // Move completed goal to the appropriate collection
        await this.goalCollection.doc(userId).collection(goalTerm).doc(goalId).set(completedGoalData);
        await goalRef.delete(); // Remove goal from original collection
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
          completedOn: null, // Reset completedOn field
        };
  
        // Determine the original collection based on gTerm
        let originalGoalTerm: string;
        switch (data["gTerm"]) {
          case "Daily":
            originalGoalTerm = "dailyGoals";
            break;
          case "Short-term":
            originalGoalTerm = "shortTermGoals";
            break;
          // Add cases for other gTerm values as needed
          default:
            // Handle default case (if any)
            break;
        }
  
        // Move goal back to the original collection
        await this.goalCollection.doc(userId).collection(originalGoalTerm).doc(goalId).set(uncompletedGoalData);
        await completedGoalRef.delete(); // Remove goal from completedGoals collection
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

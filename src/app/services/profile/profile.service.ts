import { Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { getFirestore, getDoc } from "firebase/firestore";
import { AlertController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { doc } from "@angular/fire/firestore/firebase";
import { ToasterService } from "../toaster/toaster.service";
import { FirebaseService } from "../firebase/firebase.service";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  updateExamMessage: string = "Exam updated successfully";
  deletedExamMessage: string = "Exam deleted successfully";
  constructor(
    private auth: Auth,
    private afs: AngularFirestore,
    private toasterService: ToasterService,
    private fs: FirebaseService,
    private alertCtrl: AlertController,
  ) {}
  userData;
  userId = this.getUserProfile()?.uid;
  successMessage = "Profile data updated successfully!";
  deletedMessage = "Profile data Deleted successfully!";
  profileCollection = this.afs.collection("userData");
  projectsCollection = this.afs.collection("userData").doc(this.userId).collection("myProjects");
  addProjectMessage = "Projects added successfully.";
  updateProjectMessage = "Projects updated successfully.";
  deletedProjectMessage = "Projects has been successfully deleted.";

  getUserProfile() {
    let user = this.auth.currentUser;
    // this.userId = user.uid;
    return user;
  }

  async getProfileData() {
    const user = await this.fs.getUserProfile();
    let localData: string | null = localStorage.getItem("profileData");
    if (localData !== null) {
      let profileData: any = JSON.parse(localData);
      return profileData;
    } else {
      try {
        this.toasterService.showToast("Loading Profile data", "secondary");
        let profileData = await this.afs
          .collection("userData")
          .doc(user.uid)
          .get()
          .subscribe((snap: any) => {
            let data = snap.data().profileData;
            localStorage.setItem("profileData", JSON.stringify(data));
            this.toasterService.showToast("Profile data fetched.", "success");
            return data;
          });
        return profileData;
      } catch (error) {
        console.error("Error fetching profile data:", error);
        this.toasterService.showToast("Error loading profile data", "danger");
        throw error;
      }
    }
  }

  async refreshProfileData() {
    await localStorage.removeItem("profileData");
    this.getProfileData();
  }

  async addEducationalDetail(data: any) {
    try {
      const user = await this.fs.getUserProfile();
      const profileCollection = this.afs.collection("userData").doc(user.uid);
      const userDoc = profileCollection.collection("myProjects").doc(this.userId);

      const profileData = data;

      await userDoc.set({ profileData }, { merge: true });

      this.toasterService.showToast(this.successMessage, "success");
      this.refreshProfileData();
    } catch (error) {
      console.error("Error adding educational detail:", error);
      this.toasterService.showToast("Failed to add educational detail", "danger");
    }
  }

  async addExams(data: any) {
    const user = await this.fs.getUserProfile();
    try {
      const projectsCollection = this.afs
        .collection("userData")
        .doc(user.uid)
        .collection("myExams");

      const res = await projectsCollection.add(data);
      this.toasterService.showToast(this.addProjectMessage, "success");
    } catch (error) {
      console.error("Error adding project:", error);
      this.toasterService.showToast("Failed to add project", "danger");
    }
  }
  async updateExams(data: any, idField: string) {
    const user = await this.fs.getUserProfile();
    const examsCollection = this.afs.collection("userData").doc(user.uid).collection("myExams");
    try {
      await examsCollection.doc(idField).update(data);
      this.toasterService.showToast(this.updateExamMessage, "primary");
    } catch (error) {
      console.error("Error updating exam:", error);
      this.toasterService.showToast("Failed to update exam", "danger");
    }
  }

  getExams() {
    const userId = this.getUserProfile()?.uid;
    return this.afs
      .collection("userData")
      .doc(userId)
      .collection("myExams")
      .valueChanges({ idField: "idField" });
  }

  async deleteExams(idField: string) {
    try {
      const user = await this.fs.getUserProfile();
      const examsCollection = this.afs.collection("userData").doc(user.uid).collection("myExams");

      await examsCollection.doc(idField).delete();
      this.toasterService.showToast(this.deletedExamMessage, "warning");
    } catch (error) {
      console.error("Error deleting exam:", error);
      this.toasterService.showToast("Failed to delete exam", "danger");
    }
  }

  async addProjects(data: any) {
    const user = await this.fs.getUserProfile();
    try {
      const projectsCollection = this.afs
        .collection("userData")
        .doc(user.uid)
        .collection("myProjects");

      const res = await projectsCollection.add(data);
      this.toasterService.showToast(this.addProjectMessage, "success");
    } catch (error) {
      console.error("Error adding project:", error);
      this.toasterService.showToast("Failed to add project", "danger");
    }
  }

  async updateProjects(data: any, idField: string) {
    const user = await this.fs.getUserProfile();
    const projectsCollection = this.afs
      .collection("userData")
      .doc(user.uid)
      .collection("myProjects");
    try {
      await projectsCollection.doc(idField).update(data);
      this.toasterService.showToast(this.updateProjectMessage, "primary");
    } catch (error) {
      console.error("Error updating project:", error);
      this.toasterService.showToast("Failed to update project", "danger");
    }
  }

  getProjects() {
    const userId = this.getUserProfile()?.uid;
    return this.afs
      .collection("userData")
      .doc(userId)
      .collection("myProjects")
      .valueChanges({ idField: "idField" });
  }

  async deleteProjects(idField: string) {
    try {
      const user = await this.fs.getUserProfile();
      const projectsCollection = this.afs
        .collection("userData")
        .doc(user.uid)
        .collection("myProjects");

      await projectsCollection.doc(idField).delete();
      this.toasterService.showToast(this.deletedProjectMessage, "warning");
    } catch (error) {
      console.error("Error deleting project:", error);
      this.toasterService.showToast("Failed to delete project", "danger");
    }
  }
}

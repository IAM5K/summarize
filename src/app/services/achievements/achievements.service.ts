import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AlertController } from "@ionic/angular";
import { ProfileService } from "../profile/profile.service";

@Injectable({
  providedIn: "root"
})
export class AchievementsService {

  constructor(
    private afs: AngularFirestore,
    private alertCtrl: AlertController,
    private profileService: ProfileService
  ) { }
  userId = this.profileService.getUserProfile()?.uid
  successMessage = "Achievement Added Successfully!"
  deletedMessage = "Achievement Deleted Successfully!"
  achievementCollection = this.afs.collection("userData")

  addAchievement(data: any) {
    this.achievementCollection.doc(this.userId).collection("myAchievement").add(data).then(res => {
      this.successAlert(this.successMessage);
    }).catch(err => {
      alert("There was an error in posting. \n Please try again later. Check console for detail.");
      console.warn(err);
    })
  }
  getAchievement(count: number) {
    if (count > 4) {
      return this.achievementCollection.doc(this.userId).collection("myAchievement", ref => ref.orderBy("achievedOn", "desc").limit(count)).valueChanges({ idField: "idField" })
    }
    else {
      return this.achievementCollection.doc(this.userId).collection("myAchievement", ref => ref.orderBy("achievedOn", "desc")).valueChanges({ idField: "idField" })
    }
  }
  deleteAchievement(idField: string) {
    this.achievementCollection.doc(this.userId).collection("myAchievement").doc(idField).delete().then(
      () => {
        this.successAlert(this.deletedMessage)
      }
    ).catch(err => {
      alert(err)
    })
  }
  async successAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: "Success",
      subHeader: message,
      cssClass: "success-alert",
      // message: 'This is an alert!',
      buttons: ["OK"],
    });

    await alert.present();
  }

}

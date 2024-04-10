import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AlertController } from "@ionic/angular";
import { ProfileService } from "../profile/profile.service";

@Injectable({
  providedIn: "root",
})
export class StudiesService {
  constructor(
    private afs: AngularFirestore,
    private alertCtrl: AlertController,
    private profileService: ProfileService,
  ) {}

  addMessage = "Studies added successfully.";
  updateMessage = "Studies updated successfully.";
  deletedMessage = "Studies has been successfully deleted.";
  userId = this.profileService.getUserProfile()?.uid;
  studiesCollection = this.afs.collection("userData");
  addStudies(data: any) {
    this.studiesCollection
      .doc(this.userId)
      .collection("myStudies")
      .add(data)
      .then((_res) => {
        this.successAlert(this.addMessage);
      })
      .catch((err) => {
        alert("There was an error in posting. \n Please try again later. Check console for detail.");
        console.warn(err);
      });
  }

  updateStudies(data: any, idField: string) {
    this.studiesCollection
      .doc(this.userId)
      .collection("myStudies")
      .doc(idField)
      .update(data)
      .then((_res) => {
        this.successAlert(this.updateMessage);
      })
      .catch((err) => {
        alert("There was an error in posting. \n Please try again later. Check console for detail.");
        console.warn(err);
      });
  }
  getStudies() {
    return this.studiesCollection
      .doc(this.userId)
      .collection("myStudies", (ref) => ref.orderBy("date", "desc"))
      .valueChanges({ idField: "idField" });
  }

  deleteStudies(idField: string) {
    this.studiesCollection
      .doc(this.userId)
      .collection("myStudies")
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

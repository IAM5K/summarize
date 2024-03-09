import { Injectable } from "@angular/core";
import { AngularFirestore, QuerySnapshot } from "@angular/fire/compat/firestore";
import { AlertController, ToastController } from "@ionic/angular";
import { ProfileService } from "../profile/profile.service";

@Injectable({
  providedIn: "root"
})
export class OfficeService {

  userData = localStorage.getItem("UserData")
  constructor(
    private afs: AngularFirestore,
    private alertCtrl: AlertController,
    private profileService : ProfileService,
    private toastController: ToastController
  ) { }

  userId = this.profileService.getUserProfile()?.uid

  successMessage = "Time Log Added Successfully!"
  deletedMessage = "Time Log Deleted Successfully!"
  workCollection = this.afs.collection("userData")

  getWork(count: number) {
    if (count > 4) {
      return this.workCollection.doc(this.userId).collection("myWork", ref => ref.orderBy("date", "desc").limit(count)).valueChanges({ idField: "idField" })
    }
    else {
      return this.workCollection.doc(this.userId).collection("myWork", ref => ref.orderBy("date", "desc")).valueChanges({ idField: "idField" })
    }
  }
  async addWork(data: any) : Promise<boolean> {
    try {
      await this.workCollection.doc(this.userId).collection("myWork").add(data);
      this.successAlert("Work added successfully");
      return true;
    } catch (error) {
      this.errorAlert("Error adding work. Please try again.");
      console.warn(error);
      return false;
    }
  }
  async updateWork(data: any,idField) {
    try {
      await this.workCollection.doc(this.userId).collection("myWork").doc(idField).update(data);
      this.successAlert("Work updated successfully");
      return true;
    } catch (error) {
      this.errorAlert("Error adding work. Please try again.");
      console.warn(error);
      return false;
    }
  }

  async getWorkByDate(date:string) {
    return this.workCollection.doc(this.userId).collection("myWork",(ref)=> ref.where("date","==",date).orderBy("startTime","asc")).valueChanges()
  }
  deleteWork(idField: string) {
    this.workCollection.doc(this.userId).collection("myWork").doc(idField).delete().then(
      () => {
        this.successAlert(this.deletedMessage)
      }
    ).catch(err => {
      alert(err)
    })
  }

  // async successAlert(message: string) {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Success',
  //     subHeader: message,
  //     cssClass: 'success-alert',
  //     // message: 'This is an alert!',
  //     buttons: ['OK'],
  //   });

  //   await alert.present();
  // }

  private async successAlert(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: "success",
    });
    toast.present();
  }

  private async errorAlert(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: "danger",
    });
    toast.present();
  }
}

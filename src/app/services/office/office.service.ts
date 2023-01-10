import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  userData = localStorage.getItem('UserData')
  constructor(
    private afs: AngularFirestore,
    private alertCtrl: AlertController) { }

  successMessage = "Time Log Added Successfully!"
  deletedMessage = "Time Log Deleted Successfully!"
  workCollection = this.afs.collection('userData')
  getUserId() {
    let userId = ""
    let userData = localStorage.getItem('UserData')
    if (userData) {
      userId = JSON.parse(userData).uid
    }
    return userId;
  }
  getWork(count: number) {
    if (count > 4) {
      return this.workCollection.doc(this.getUserId()).collection('myWork', ref => ref.orderBy('date', 'desc').limit(count)).valueChanges({ idField: 'idField' })
    }
    else {
      return this.workCollection.doc(this.getUserId()).collection('myWork', ref => ref.orderBy('date', 'desc')).valueChanges({ idField: 'idField' })
    }
  }
  addWork(data: any) {
    let userId = ""
    if (this.userData) {
      userId = JSON.parse(this.userData).uid
    }
    this.workCollection.doc(userId).collection('myWork').add(data).then(res => {
      this.successAlert(this.successMessage);
    }).catch(err => {
      alert("There was an error in posting. \n Please try again later. Check console for detail.");
      console.warn(err);
    })
  }
  updateWork(data: any) {

  }

  getWorkById() { }
  deleteWork(idField: string) {
    this.workCollection.doc(this.getUserId()).collection('myWork').doc(idField).delete().then(
      () => {
        this.successAlert(this.deletedMessage)
      }
    ).catch(err => {
      alert(err)
    })
  }

  async successAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Success',
      subHeader: message,
      cssClass: 'success-alert',
      // message: 'This is an alert!',
      buttons: ['OK'],
    });

    await alert.present();
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StudiesService {

  constructor(
  private afs: AngularFirestore,
  private alertCtrl: AlertController)
  { }
  studiesCollection = this.afs.collection('userData')
  addStudies(data: any) {
    let userId = ""
    let userData = localStorage.getItem('UserData')
    if (userData) {
      userId = JSON.parse(userData).uid
    }
    this.studiesCollection.doc(userId).collection('myStudies').add(data).then(res => {
      this.successAlert();
    }).catch(err => {
      alert("There was an error in posting. \n Please try again later. Check console for detail.");
      console.warn(err);
    })
  }
  getStudies() {
    let userId = ""
    let userData = localStorage.getItem('UserData')
    if (userData) {
      userId = JSON.parse(userData).uid
    }
    return this.studiesCollection.doc(userId).collection('myStudies', ref => ref.orderBy('date', 'desc')).valueChanges({ idField: 'idField' })
  }

  async successAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Success',
      subHeader: 'Studies added Successfully!',
      cssClass: 'success-alert',
      // message: 'This is an alert!',
      buttons: ['OK'],
    });

    await alert.present();
  }
}

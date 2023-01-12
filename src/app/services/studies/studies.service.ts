import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class StudiesService {

  constructor(
    private afs: AngularFirestore,
    private alertCtrl: AlertController,
    private profileService: ProfileService
  ) { }

  userId = this.profileService.getUserProfile()?.uid
  studiesCollection = this.afs.collection('userData')
  addStudies(data: any) {
    this.studiesCollection.doc(this.userId).collection('myStudies').add(data).then(res => {
      this.successAlert();
    }).catch(err => {
      alert("There was an error in posting. \n Please try again later. Check console for detail.");
      console.warn(err);
    })
  }
  getStudies() {
    return this.studiesCollection.doc(this.userId).collection('myStudies', ref => ref.orderBy('date', 'desc')).valueChanges({ idField: 'idField' })
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

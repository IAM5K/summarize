import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  userData = localStorage.getItem('UserData')
  constructor(
    private afs: AngularFirestore,
    private alertCtrl: AlertController,
    private profileService : ProfileService
  ) { }

  userId = this.profileService.getUserProfile()?.uid

  successMessage = "Time Log Added Successfully!"
  deletedMessage = "Time Log Deleted Successfully!"
  workCollection = this.afs.collection('userData')

  getWork(count: number) {
    if (count > 4) {
      return this.workCollection.doc(this.userId).collection('myWork', ref => ref.orderBy('date', 'desc').limit(count)).valueChanges({ idField: 'idField' })
    }
    else {
      return this.workCollection.doc(this.userId).collection('myWork', ref => ref.orderBy('date', 'desc')).valueChanges({ idField: 'idField' })
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

  async getWorkByDate(date:string) {
    return this.workCollection.doc(this.userId).collection('myWork',(ref)=> ref.where('date','==',date).orderBy('startTime','asc')).valueChanges()
  }
  deleteWork(idField: string) {
    this.workCollection.doc(this.userId).collection('myWork').doc(idField).delete().then(
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

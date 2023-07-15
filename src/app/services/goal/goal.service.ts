import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(
    private afs: AngularFirestore,
    private alertCtrl: AlertController,
    private profileService: ProfileService
  ) { }

  addMessage = "Goal added successfully."
  updateMessage = "Goal updated successfully."
  deletedMessage = "Goal has been successfully deleted."
  userId = this.profileService.getUserProfile()?.uid
  goalCollection = this.afs.collection('userData')
  addGoal(data: any) {
    this.goalCollection.doc(this.userId).collection('myGoal').add(data).then(res => {
      this.successAlert( this.addMessage );
    }).catch(err => {
      alert("There was an error in posting. \n Please try again later. Check console for detail.");
      console.warn(err);
    })
  }

  updateGoal(data: any,idField:string) {
    this.goalCollection.doc(this.userId).collection('myGoal').doc(idField).update(data).then(res => {
      this.successAlert( this.updateMessage );
    }).catch(err => {
      alert("There was an error in posting. \n Please try again later. Check console for detail.");
      console.warn(err);
    })
  }
  getGoal() {
    return this.goalCollection.doc(this.userId).collection('myGoal', ref => ref.orderBy('date', 'desc')).valueChanges({ idField: 'idField' })
  }

  deleteGoal(idField: string) {
    this.goalCollection.doc(this.userId).collection('myGoal').doc(idField).delete().then(
      () => {
        this.successAlert(this.deletedMessage)
      }
    ).catch(err => {
      alert(err)
    })
  }

  async successAlert(message:string) {
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

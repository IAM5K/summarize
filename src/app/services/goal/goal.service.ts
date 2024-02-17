import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { ProfileService } from '../profile/profile.service';
import { FirebaseService } from '../firebase/firebase.service';
import { ToasterService } from '../toaster/toaster.service';
import { GoalData } from 'src/app/models/interface/goals.interface';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  constructor(
    private afs: AngularFirestore,
    private alertCtrl: AlertController,
    private fs: FirebaseService,
    private profileService: ProfileService,
    private toasterService: ToasterService
  ) {}

  addMessage = 'Goal added successfully.';
  updateMessage = 'Goal updated successfully.';
  deletedMessage = 'Goal has been successfully deleted.';
  // userId = this.profileService.getUserProfile()?.uid;
  goalCollection = this.afs.collection('userGoals');

  getGoal() {
    const userId = this.fs.userData.uid;
    console.log(userId);
    return this.goalCollection
      .doc(userId)
      .collection('myGoal')
      .valueChanges({ idField: 'idField' });
  }
  getDailyGoal() {
    const userId = this.fs.userData.uid;
    console.log('getting priority goals for: ', userId);
    return this.goalCollection
      .doc(userId)
      .collection('dailyGoals', (ref) =>
        ref
          .orderBy('gTerm')
          .orderBy('date', 'asc')
          .where('gTerm', '==', 'Daily')
      )
      .valueChanges({ idField: 'idField' });
  }
  getPriorityGoal() {
    const userId = this.fs.userData.uid;
    console.log('getting priority goals for: ', userId);
    return this.goalCollection
      .doc(userId)
      .collection('priorityGoals', (ref) =>
        ref
          .orderBy('gTerm')
          .orderBy('date', 'asc')
          .where('gTerm', '!=', 'Daily')
      )
      .valueChanges({ idField: 'idField' });
  }

  addGoal(data: GoalData) {
    console.log(data);
    const goalTerm = data.gTerm === 'Daily' ? 'dailyGoals' : 'priorityGoals';
    const userId = this.fs.userData.uid;
    this.goalCollection
      .doc(userId)
      .collection(goalTerm)
      .add(data)
      .then((res) => {
        console.log(res);
        this.toasterService.showToast(this.addMessage, 'success');
        // this.successAlert(this.addMessage);
      })
      .catch((err) => {
        alert(
          'There was an error in posting. \n Please try again later. Check console for detail.'
        );
        console.warn(err);
      });
  }

  async updateGoal(data: GoalData, idField: string) {
    try {
      const userId = this.fs.userData.uid;
      const goalTerm = data.gTerm === 'Daily' ? 'dailyGoals' : 'priorityGoals';
      delete data.idField;
      console.log(data);
      await this.goalCollection
        .doc(userId)
        .collection(goalTerm)
        .doc(idField)
        .update(data);
      this.toasterService.showToast(this.updateMessage, 'success');
    } catch (error) {
      console.error('Error updating goal:', error);
      this.toasterService.showToast('Error updating goal', 'danger');
    }
  }

  deleteGoal(data: any, idField: string) {
    const userId = this.fs.userData.uid;
    const goalTerm = data.gTerm === 'Daily' ? 'dailyGoals' : 'priorityGoals';
    this.goalCollection
      .doc(userId)
      .collection(goalTerm)
      .doc(idField)
      .delete()
      .then(() => {
        this.successAlert(this.deletedMessage);
      })
      .catch((err: Error) => {
        alert(err);
      });
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

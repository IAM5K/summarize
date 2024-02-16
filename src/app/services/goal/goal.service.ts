import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { ProfileService } from '../profile/profile.service';
import { FirebaseService } from '../firebase/firebase.service';
import { ToasterService } from '../toaster/toaster.service';

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
  goalCollection = this.afs.collection('userData');
  
  getGoal() {
    const userId = this.fs.userData.uid;
    console.log(userId);
    return this.goalCollection
      .doc(userId)
      .collection('myGoal')
      .valueChanges({ idField: 'idField' });
  }
  
  addGoal(data: any) {
    console.log(data);

    const userId = this.fs.userData.uid;
    this.goalCollection
      .doc(userId)
      .collection('myGoal')
      .add(data)
      .then((res) => {
        console.log(res);
        this.toasterService.showToast(this.addMessage,"success")
        // this.successAlert(this.addMessage);
      })
      .catch((err) => {
        alert(
          'There was an error in posting. \n Please try again later. Check console for detail.'
        );
        console.warn(err);
      });
  }

  updateGoal(data: any, idField: string) {
    const userId = this.fs.userData.uid;

    this.goalCollection
      .doc(userId)
      .collection('myGoal')
      .doc(idField)
      .update(data)
      .then((res) => {
        this.successAlert(this.updateMessage);
      })
      .catch((err: Error) => {
        alert(
          'There was an error in posting. \n Please try again later. Check console for detail.'
        );
        console.warn(err);
      });
  }


  deleteGoal(idField: string) {
    const userId = this.fs.userData.uid;

    this.goalCollection
      .doc(userId)
      .collection('myGoal')
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

import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, getDoc } from 'firebase/firestore';
import { AlertController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { doc } from '@angular/fire/firestore/firebase';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private auth: Auth,
    private afs: AngularFirestore,
    private alertCtrl: AlertController
  ) {}
  userId = this.getUserProfile()?.uid;
  successMessage = 'Profile data updated successfully!';
  deletedMessage = 'Profile data Deleted successfully!';
  profileCollection = this.afs.collection('userData');
  getUserProfile() {
    let user = this.auth.currentUser;
    return user;
  }
 

  async getEducationalDetail() {
    const db = getFirestore();
    // const docRef =  doc(db,"userData",this.userId)
  }
  addEducationalDetail(data: any) {
    const userDoc = this.profileCollection.doc(this.userId);
    // Create the data structure for the profile
    const profileData = {
      educationalData: data,
    };
    // Use .set() to update the profileData field within the user document
    userDoc
      .set({ profileData }, { merge: true })
      .then(() => {
        this.successAlert(this.successMessage);
        console.log('Educational detail added successfully.');
      })
      .catch((err) => {
        alert(
          'There was an error in posting. \n Please try again later. Check console for detail.'
        );
        console.warn(err);
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

import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, getDoc } from 'firebase/firestore';
import { AlertController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { doc } from '@angular/fire/firestore/firebase';
import { ToasterService } from '../toaster/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private auth: Auth,
    private afs: AngularFirestore,
    private toasterService: ToasterService,
    private alertCtrl: AlertController
  ) {}
  userId = this.getUserProfile()?.uid;
  successMessage = 'Profile data updated successfully!';
  deletedMessage = 'Profile data Deleted successfully!';
  profileCollection = this.afs.collection('userData');
  projectsCollection = this.afs
    .collection('userData')
    .doc(this.userId)
    .collection('myProjects');
  addProjectMessage = 'Projects added successfully.';
  updateProjectMessage = 'Projects updated successfully.';
  deletedProjectMessage = 'Projects has been successfully deleted.';

  getUserProfile() {
    let user = this.auth.currentUser;
    // this.userId = user.uid;
    return user;
  }

  async getProfileData() {
    let localData: string | null = localStorage.getItem('profileData');
    if (localData !== null) {
      console.log('Found in local if case');

      let profileData: any = JSON.parse(localData);
      return profileData;
    } else {
      this.toasterService.showToast("Loading Profile data", "secondary")
      let profileData = await this.afs
        .collection(`userData`)
        .doc(this.userId)
        .get()
        .subscribe((snap: any) => {
          let data = snap.data().profileData;
          console.log(data);
          localStorage.setItem('profileData', JSON.stringify(data));
          return data;
        });
      return profileData;
    }
  }

  async refreshProfileData() {
    await localStorage.removeItem('profileData');
    this.getProfileData();
  }

  addEducationalDetail(data: any) {
    let userDoc = this.profileCollection.doc(this.userId);
    const profileData = data;
    userDoc
      .set({ profileData }, { merge: true })
      .then(() => {
        this.toasterService.showToast(this.successMessage,"success");
        console.log('Educational detail added successfully.');
      })
      .catch((err) => {
        alert(
          'There was an error in posting. \n Please try again later. Check console for detail.'
        );
        console.warn(err);
      });
    this.refreshProfileData();
  }

  addProjects(data: any) {
    this.projectsCollection
      .add(data)
      .then((res) => {
        console.log(res);
        this.toasterService.showToast(this.addProjectMessage,"success");
      })
      .catch((err) => {
        alert(
          'There was an error in posting. \n Please try again later. Check console for detail.'
        );
        console.warn(err);
      });
  }

  updateProjects(data: any, idField: string) {
    this.projectsCollection
      .doc(idField)
      .update(data)
      .then((res) => {
        this.toasterService.showToast(this.updateProjectMessage, "primary");
      })
      .catch((err: Error) => {
        alert(
          'There was an error in posting. \n Please try again later. Check console for detail.'
        );
        console.warn(err);
      });
  }
  getProjects() {
    const userId = this.getUserProfile()?.uid;    
    return this.afs.collection('userData').doc(userId).collection('myProjects').valueChanges({ idField: 'idField' });
  }

  deleteProjects(idField: string) {
    this.projectsCollection
      .doc(idField)
      .delete()
      .then(() => {
        this.toasterService.showToast(this.deletedProjectMessage,"warning");
      })
      .catch((err: Error) => {
        alert(err);
      });
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
}

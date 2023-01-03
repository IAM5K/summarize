import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  userData = localStorage.getItem('UserData')
  constructor(
    private afs:AngularFirestore,
    private alertCtrl:AlertController) { }

    workCollection = this.afs.collection('userData')
  getWork(){
    let userId=""
    if(this.userData){
      userId = JSON.parse(this.userData).uid
    }
    return this.workCollection.doc(userId).collection('myWork',ref => ref.orderBy('date', 'desc')).valueChanges({idField:'idField'})
  }
  addWork(data:any){
    let userId=""
    if(this.userData){
      userId = JSON.parse(this.userData).uid
    }
    this.workCollection.doc(userId).collection('myWork').add(data).then(res=>{
      this.successAlert();
    }).catch(err=>{
      alert("There was an error in posting. \n Please try again later. Check console for detail.");
      console.warn(err);
    })
  }
  updateWork(data:any){

  }

  getWorkById(){}
  deleteWork(){}

  async successAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Success',
      subHeader: 'Work added Successfully!',
      cssClass: 'success-alert',
      // message: 'This is an alert!',
      buttons: ['OK'],
    });

    await alert.present();
  }
}

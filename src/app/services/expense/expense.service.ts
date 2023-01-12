import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AlertController } from '@ionic/angular';
import { ProfileService } from '../profile/profile.service';
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private afs: AngularFirestore,
    private alertCtrl: AlertController,
    private profileService : ProfileService
  ) { }
  userId = this.profileService.getUserProfile()?.uid
  successMessage="Expence Added Successfully!"
  deletedMessage="Expence Deleted Successfully!"
  expenseCollection = this.afs.collection('userData')

  addExpense(data: any) {
    this.expenseCollection.doc(this.userId).collection('myExpence').add(data).then(res => {
      this.successAlert(this.successMessage);
    }).catch(err => {
      alert("There was an error in posting. \n Please try again later. Check console for detail.");
      console.warn(err);
    })
  }
  getExpenses(count: number) {
    if (count > 4) {
      return this.expenseCollection.doc(this.userId).collection('myExpence', ref => ref.orderBy('date', 'desc').limit(count)).valueChanges({ idField: 'idField' })
    }
    else {
      return this.expenseCollection.doc(this.userId).collection('myExpence', ref => ref.orderBy('date', 'desc')).valueChanges({ idField: 'idField' })
    }
  }
  deleteExpense(idField:string){
    this.expenseCollection.doc(this.userId).collection('myExpence').doc(idField).delete().then(
      ()=>{
        this.successAlert(this.deletedMessage)
      }
    ).catch(err=>{
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

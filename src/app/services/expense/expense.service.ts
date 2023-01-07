import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private afs: AngularFirestore,
    private alertCtrl: AlertController
  ) { }
  expenseCollection = this.afs.collection('userData')
  addExpense(data: any) {
    let userId = ""
    let userData = localStorage.getItem('UserData')
    if (userData) {
      userId = JSON.parse(userData).uid
    }
    this.expenseCollection.doc(userId).collection('myExpense').add(data).then(res => {
      this.successAlert();
    }).catch(err => {
      alert("There was an error in posting. \n Please try again later. Check console for detail.");
      console.warn(err);
    })
  }
  getExpenses(count: number) {
    let userId = ""
    let userData = localStorage.getItem('UserData')
    if (userData) {
      userId = JSON.parse(userData).uid
    }
    if (count > 4) {
      return this.expenseCollection.doc(userId).collection('myExpence', ref => ref.orderBy('date', 'desc').limit(count)).valueChanges({ idField: 'idField' })
    }
    else {
      return this.expenseCollection.doc(userId).collection('myExpence', ref => ref.orderBy('date', 'desc')).valueChanges({ idField: 'idField' })
    }
  }

  async successAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Success',
      subHeader: 'Expense added Successfully!',
      cssClass: 'success-alert',
      // message: 'This is an alert!',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
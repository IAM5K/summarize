import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AlertController } from '@ionic/angular';
import { ProfileService } from '../profile/profile.service';
import { ToasterService } from '../toaster/toaster.service';
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private afs: AngularFirestore,
    private alertCtrl: AlertController,
    private profileService: ProfileService,
    private toasterService: ToasterService
  ) { }
  analyseExpense:any;
  userId = this.profileService.getUserProfile()?.uid
  successMessage = "Expense Added Successfully!"
  deletedMessage = "Expense Deleted Successfully!"
  expenseCollection = this.afs.collection('userData')

  addExpense(data: any) {
    this.expenseCollection.doc(this.userId).collection('myExpence').add(data).then(res => {
      this.successAlert(this.successMessage);
    }).catch(err => {
      alert("There was an error in posting. \n Please try again later. Check console for detail.");
      console.warn(err);
    })
  }
  getExpenses(count?: number) {
    if (count) {
      return this.expenseCollection.doc(this.userId).collection('myExpence', ref => ref.orderBy('date', 'desc').limit(count)).valueChanges({ idField: 'idField' })
    }
    else {
      return this.expenseCollection.doc(this.userId).collection('myExpence', ref => ref.orderBy('date', 'desc')).valueChanges({ idField: 'idField' })
    }
  }
  getCustomExpenses(filterBy?: string, data?: string, duration?:string) {
    // console.log(filterBy +" : " + data  +" : " +duration );
    let query = null;
    switch (filterBy) {
      case "duration":
        query = this.expenseCollection.doc(this.userId).collection('myExpence', ref => ref.orderBy('date', 'desc').where('date', '>=', data)).valueChanges({ idField: 'idField' })
        break;
      case "spentOn":
        query = this.expenseCollection.doc(this.userId).collection('myExpence', ref => ref.where('spendedOn', '==', data).orderBy('date').startAt(duration)).valueChanges({ idField: 'idField' })
        break;
      case "type":
        query = this.expenseCollection.doc(this.userId).collection('myExpence', ref => ref.where('type', '==', data).orderBy('date').startAt(duration)).valueChanges({ idField: 'idField' })
        break;
      default:
        query = this.expenseCollection.doc(this.userId).collection('myExpence', ref => ref.orderBy('date', 'desc').limit(5)).valueChanges({ idField: 'idField' });
        break;
    }
    return query;
  }

  getExpenseByDate(date: string) {
    return this.expenseCollection.doc(this.userId).collection('myExpence',(ref)=> ref.where('date','==',date).orderBy('amount','asc')).valueChanges({ idField: 'idField' })
  }
  
  async updateExpense(data,idField){
    try {
      await this.expenseCollection.doc(this.userId).collection('myExpence').doc(idField).update(data);
      this.successAlert('Expense updated successfully');
      return true;
    } catch (error) {
      this.toasterService.showToast("Error updating expense. Please try again.","danger");
      console.warn(error);
      return false;
    }
  }
  deleteExpense(idField: string) {
    this.expenseCollection.doc(this.userId).collection('myExpence').doc(idField).delete().then(
      () => {
        this.successAlert(this.deletedMessage)
      }
    ).catch(err => {
      alert(err)
    })
  }
  async successAlert(message: string) {
    this.toasterService.showToast(message,"success")
    // const alert = await this.alertCtrl.create({
    //   header: 'Success',
    //   subHeader: message,
    //   cssClass: 'success-alert',
    //   // message: 'This is an alert!',
    //   buttons: ['OK'],
    // });

    // await alert.present();
  }

  getBudget(){
    return this.expenseCollection.doc(this.userId).collection('myBudget', ref => ref.orderBy('month', 'desc')).valueChanges({ idField: 'idField' })
  }
  addBudget(data: any) {
    this.expenseCollection.doc(this.userId).collection('myBudget').add(data).then(res => {
      const msg ="Budget Added Successfully!"
      this.successAlert(msg);
    }).catch(err => {
      alert("There was an error in posting.\n Please try again later. Check console for detail. \nContact /report us in case of no success ");
      console.warn(err);
    })
  }

  updateBudget(data: any) {
    this.expenseCollection.doc(this.userId).collection('myBudget').doc(data.idField).update(data).then(res => {
      const msg ="Budget updated successfully!"
      this.successAlert(msg);
    }).catch(err => {
      alert("There was an error in updating budget. \n Please try again later. Check console for detail. \nContact /report us in case of no success ");
      console.warn(err);
    })
  }

}

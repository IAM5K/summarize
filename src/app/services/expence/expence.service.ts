import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class ExpenceService {

  constructor(
    private afs:AngularFirestore
  ) { }
  expenseCollection = this.afs.collection('user')
  addExpense(data:any){
    let userId=""
    let userData = localStorage.getItem('UserData')
    if(userData){
      userId = JSON.parse(userData).uid
    }
    this.expenseCollection.doc(userId).collection('myExpence').add(data).then(res=>{
      alert("News Submitted Successfully")
    }).catch(err=>{
      alert("There was an error in posting. \n Please try again later. Check console for detail.");
      console.warn(err);
    })
  }
  getExpences(){
    let userId=""
    let userData = localStorage.getItem('UserData')
    if(userData){
      userId = JSON.parse(userData).uid
    }
    return this.expenseCollection.doc(userId).collection('myExpence').valueChanges({idField:'idField'})
  }
}

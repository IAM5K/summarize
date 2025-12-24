import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root",
})
export class SupportService {
  supportCollection: AngularFirestoreCollection;
  supportDoc!: AngularFirestoreDocument;

  constructor(private afs: AngularFirestore) {
    this.supportCollection = this.afs.collection("support", (ref) =>
      ref.orderBy("createdAt", "desc"),
    );
  }

  postSupport(value: any) {
    return this.supportCollection.add(value);
  }
  getSupport() {
    return this.supportCollection.valueChanges({ idField: "idField" });
  }
  updateData(idField: string, data: any) {
    this.afs
      .doc(`support/${idField}`)
      .update(data)
      .then((_res) => {
        // console.log('success');
      })
      .catch((_err) => {
        //(err);
      });
  }
  deleteSupport(itemId: string) {
    this.supportDoc = this.afs.doc(`support/${itemId}`);
    return this.supportDoc.delete();
  }

  formatDate(str: any) {
    if (!str) {
      return false;
    } else {
      return str.toDate().toString().slice(4, 24);
    }
  }
}

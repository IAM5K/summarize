import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ProfileService } from "../profile/profile.service";
import { ToasterService } from "../toaster/toaster.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  constructor(
    private afs: AngularFirestore,
    private profileService: ProfileService,
    private toasterService: ToasterService,
  ) {}

  userId = this.profileService.getUserProfile()?.uid;
  successMessage = "Expense Added Successfully!";
  deletedMessage = "Expense Deleted Successfully!";
  expenseCollection = this.afs.collection("userData");

  getLists(userId: string): Observable<any[]> {
    return this.afs.collection("lists", (ref) => ref.where("collaborators", "array-contains", userId)).valueChanges();
  }

  createList(name: string, owner: string): Promise<void> {
    const id = this.afs.createId();
    return this.afs
      .collection("shopping-lists")
      .doc(id)
      .set({
        name,
        owner,
        collaborators: [owner],
        items: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  }

  addItem(listId: string, name: string, userId: string): Promise<void> {
    const itemId = this.afs.createId();
    const item = {
      name,
      quantity: 1,
      completed: false,
      listId,
      addedBy: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.afs
      .collection("items")
      .doc(itemId)
      .set(item)
      .then(() => {
        return this.afs.collection("lists").doc(listId).update({
          // items: firebase.firestore.FieldValue.arrayUnion(itemId),
        });
      });
  }

  getItems(listId: string): Observable<any[]> {
    return this.afs.collection("items", (ref) => ref.where("listId", "==", listId)).valueChanges();
  }
}

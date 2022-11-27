import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';
import { Photo } from '@capacitor/camera';

export interface Note {
  id?: string;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  constructor(private auth: Auth, private firestore: Firestore, private storage: Storage) {}

  getUserProfile() {
		const user = this.auth.currentUser;
    if(user){
		  const userDocRef = doc(this.firestore, `users/${user.uid}`);
		  return docData(userDocRef, { idField: 'id' });
    }
    else{
      return false
    }
	}

  async uploadImage(cameraFile: Photo) {
		const user = this.auth.currentUser;
    if(user && cameraFile !== undefined ){
		const path = `uploads/${user.uid}/profile.webp`;
		const storageRef = ref(this.storage, path);
		try {
			await uploadString(storageRef, cameraFile.base64String?cameraFile.base64String:"failed", 'base64');

			const imageUrl = await getDownloadURL(storageRef);

			const userDocRef = doc(this.firestore, `users/${user?.uid}`);
			await setDoc(userDocRef, {
				imageUrl
			});
			return true;
		} catch (e) {
			return null;
		}
    }
    else{
      return null
    }

	}
}

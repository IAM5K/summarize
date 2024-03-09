import { Injectable } from "@angular/core";
import { Firestore, doc, setDoc } from "@angular/fire/firestore";
import { Subscription } from "rxjs";
import { getDownloadURL, ref, Storage, uploadString } from "@angular/fire/storage";
import { Auth } from "@angular/fire/auth";
import { Photo } from "@capacitor/camera";
import { AngularFireAuth } from "@angular/fire/compat/auth";

export interface Note {
  id?: string;
  title: string;
  text: string;
}

@Injectable({
  providedIn: "root"
})
export class FirebaseService {

  private authStateSubscription: Subscription;
  userData;
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private firebaseAuth: AngularFireAuth,
    private storage: Storage
  ) {}

  getUserProfile(): Promise<any> {
    return new Promise((resolve) => {
      this.authStateSubscription = this.firebaseAuth.authState.subscribe((user) => {
        if (user) {
          // console.log(user.uid);
          this.userData = user;
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  }

  async uploadImage(cameraFile: Photo) {
		const user = this.auth.currentUser;
    if(user && cameraFile !== undefined ){
		const path = `uploads/${user.uid}/profile.webp`;
		const storageRef = ref(this.storage, path);
		try {
			await uploadString(storageRef, cameraFile.base64String?cameraFile.base64String:"failed", "base64");

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

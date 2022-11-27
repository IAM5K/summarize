import { Injectable } from '@angular/core';
import {
	Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { User } from 'src/app/models/interface/user.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	isLogin: boolean = false;
	userDoc: AngularFirestoreDocument | undefined;
	// userRef = this.afs.collection(`user`)
	constructor(private auth: Auth, private afs: AngularFirestore,
    private firebaseAuth: AngularFireAuth,
		private router: Router) { }

	async register(email: any, password: any) {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, email, password);
			return user;
		} catch (e) {
			return null;
		}
	}

	async login(email: any, password: any) {
		try {
			const user = await signInWithEmailAndPassword(this.auth, email, password);
			await this.getEmailBasedUser(user.user)

			localStorage.setItem('user', JSON.stringify(user.user))
			return user;
		} catch (e) {
			return null;
		}
	}

	logout() {
		localStorage.clear()
		return signOut(this.auth);
	}
	async googleSignin() {
	  const provider = new firebase.auth.GoogleAuthProvider();
	  const credential = await this.firebaseAuth.signInWithPopup(provider);
	  return this.updateUserData(credential.user);
	}
	async getEmailBasedUser(user: any) {
		const userRef: AngularFirestoreDocument = this.afs.doc(
			`user/${user.uid}`
		);
		if (userRef.get()) {
			userRef.get().subscribe((res: any) => {
				let responseData = res.data()
				if (responseData == undefined) {
					const data = JSON.parse(JSON.stringify(user))
					userRef.set(data, { merge: true })
				}
				localStorage.setItem('UserData', JSON.stringify(user))
			})
		}
		else if (userRef.get() == undefined) {
			userRef.set(user, { merge: true })
		}

		// var user=await this.userRef.doc(uid).valueChanges().subscribe((res:any) => {
		// 	if (res.uid!== undefined) {
		// 	console.log(res.uid);
		// 	} else {
		// 		console.log("Not Found");	
		// 	}
		// })

		// let userRef = this.afs.doc(`user/${uid}`).valueChanges({ uid: uid }).subscribe((res: any) => {
		// 	if (res.uid !== undefined) {
		// 		console.log(res.uid);
		// 		return true
		// 	} else {
		// 		console.log("Not Found");
		// 		return false
		// 	}
		// })
		// return userRef;
	}


	private updateUserData(user:any) {
	  // Sets user data to firestore on login
	  const userRef: AngularFirestoreDocument= this.afs.doc(
	    `user/${user.uid}`
	  );

	  const data = JSON.parse(JSON.stringify(user))
		if (userRef.get()) {
			userRef.get().subscribe((res: any) => {
				let responseData = res.data()
				if (responseData == undefined) {
					const data = JSON.parse(JSON.stringify(user))
					userRef.set(data, { merge: true })
				}
				localStorage.setItem('UserData', JSON.stringify(user))
				this.router.navigateByUrl('/home', { replaceUrl: true });
			})
		}
	  else{
	    userRef.set(data, { merge: true });
	  }

	}
}
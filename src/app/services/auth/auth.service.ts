import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../models/interface/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin: boolean =true;
  user: any = null;
  user$: Observable<User|null|undefined> ;
  userRole: any;
  userCollection: AngularFirestoreCollection | undefined;
  userDoc: any;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.firebaseAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getUser() {
    this.firebaseAuth.authState.subscribe((user) => {
      this.user = user ? user : null;
      if (this.user == null) {
        this.getUser();
      } else {
        // console.log(this.user);
        localStorage.setItem('User', JSON.stringify(this.user));
      }
    });
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.firebaseAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  updateUserData(user:any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `user/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: 'reader',
    };
    if (userRef.get()) {
      userRef.get().subscribe((res) => {
        console.log(res.data())
        localStorage.setItem('UserData', JSON.stringify(res.data()))
      });
    }
    else{
      userRef.set(data, { merge: true });
    }

  }

  async signOut() {
    await this.firebaseAuth.signOut();
    localStorage.clear();
    this.router.navigate(['/']);
  }

  async getUserData(uid:any) {
    await this.afs
      .collection('user')
      .doc(uid)
      .get()
      .subscribe((res) => {
        this.userDoc = res.data();
        this.userRole = this.userDoc.role;
      });
  }
}

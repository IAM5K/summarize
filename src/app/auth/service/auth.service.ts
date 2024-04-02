import { Injectable } from "@angular/core";
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
} from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { error } from "console";
import firebase from "firebase/compat/app";
import { Observable, map } from "rxjs";
import { User } from "src/app/models/interface/user.model";
import { ToasterService } from "src/app/services/toaster/toaster.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLogin: boolean = true;
  userDoc: AngularFirestoreDocument | undefined;
  user!: firebase.User | null;
  isLoggedIn$: Observable<boolean>;
  // userRef = this.afs.collection(`user`)
  constructor(
    private auth: Auth,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toaster: ToasterService,
  ) {
    // Subscribe to authentication state changes
    this.isLoggedIn$ = this.afAuth.authState.pipe(
      map((user) => !!user), // Convert user object to boolean (true if logged in, false if not)
    );
  }

  async register(email: any, password: any) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      this.updateUserData(user.user);
      return user;
    } catch (e) {
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      await this.getEmailBasedUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      this.isLogin = true;
      this.toaster.showToast("Login Success!", "success");
      return user;
    } catch (error) {
      const errorCode = error.code;
      let errorMessage = "An error occurred. Please try again.";

      switch (errorCode) {
        case "auth/invalid-login-credentials":
          errorMessage = "Invalid credentials";
          break;
        case "auth/user-not-found":
          errorMessage = "User not found. Please check your email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Invalid password. Please try again.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address. Please enter a valid email.";
          break;

        default:
          errorMessage = " Unknown error occurred";
          break;
      }
      this.toaster.showToast(errorMessage, "danger");
      return null;
    }
  }
  logout() {
    this.isLogin = false;
    localStorage.clear();
    return signOut(this.auth);
  }
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        // console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  async googleSignin(): Promise<any> {
    // this.GoogleAuth()
    let provider = new GoogleAuthProvider();
    // console.log(typeof( provider));
    const credential = await this.afAuth.signInWithPopup(provider);
    if (credential) {
      this.isLogin = true;
      this.updateUserData(credential.user);
      return credential.user;
    } else {
      return null;
    }
  }
  async getEmailBasedUser(user: any) {
    const userRef: AngularFirestoreDocument = this.afs.doc(`user/${user.uid}`);
    if (userRef.get()) {
      userRef.get().subscribe((res: any) => {
        let responseData = res.data();
        if (responseData === undefined) {
          const data = JSON.parse(JSON.stringify(user));
          userRef.set(data, { merge: true });
        }
        localStorage.setItem("UserData", JSON.stringify(user));
      });
    } else if (userRef.get() === undefined) {
      userRef.set(user, { merge: true });
    }
  }

  private updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument = this.afs.doc(`user/${user.uid}`);

    const data = JSON.parse(JSON.stringify(user));
    if (userRef.get()) {
      userRef.get().subscribe((res: any) => {
        let responseData = res.data();
        if (responseData === undefined) {
          const data = JSON.parse(JSON.stringify(user));
          userRef.set(data, { merge: true });
        }
        localStorage.setItem("UserData", JSON.stringify(user));
        this.router.navigateByUrl("/home", { replaceUrl: true });
      });
    } else {
      userRef.set(data, { merge: true });
    }
  }

  async resetPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}

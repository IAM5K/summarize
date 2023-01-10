import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private auth: Auth) { }
  getUserProfile(){
    let user = this.auth.currentUser
    return user;
  }
}

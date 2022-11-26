import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  pageTitle="Login Here"
  username="";
  password="";
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
  }

  login(){
    if(this.username=="user" && this.password=="user"){
      this.auth.isLogin=true;
      this.router.navigate(['home'])
    }
  }
}

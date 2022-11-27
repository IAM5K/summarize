import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pageTitle="Home"

  constructor(
		private authService: AuthService,
		private router: Router
  ) { }

  ngOnInit() {
  }

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('login', { replaceUrl:true });

  }

}

import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoggedIn: any = false;
  public appPages:any = [];
  public labels:any = [];
  constructor(
    private authService: AuthService,
    private firebaseAuth: AngularFireAuth,
		private router: Router) {
  }

  ngOnInit() {
    this.getUser()
  }
  afterViewinit(): void{
    if (this.isLoggedIn) {
      this.getSidebar()
    }
  }

  async getUser() {
    await this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.getSidebar();
      }
      else {
        this.isLoggedIn = false;
      }
    });
  }

  getSidebar(){
    this.appPages = [
      { title: 'Dashboard', color: 'primary', url: 'home', icon: 'grid' },
      { title: 'About', color: 'warning', url: 'about', icon: 'reader' },
      { title: 'Expenses', color: 'success', url: 'expenses', icon: 'cash' },
      { title: 'Time', color: 'danger', url: 'office', icon: 'hourglass' },
      { title: 'Analytics', color: 'success', url: 'analytics', icon: 'analytics' },
      { title: 'Setup', color: 'warning', url: 'setup', icon: 'settings' },
      { title: 'Profile', color: 'secondary', url: 'profile', icon: 'person' },
      { title: 'Support', color: 'tertiary', url: 'support', icon: 'paper-plane' }
    ];
  }

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('login', { replaceUrl:true });
  }

}

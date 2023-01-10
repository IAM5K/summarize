import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { StatusBar, Style } from '@capacitor/status-bar';
import { isPlatform } from '@ionic/angular';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoggedIn: any = false;
  public appPages: any = [];
  public labels: any = [];
  constructor(
    private authService: AuthService,
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private gtmService: GoogleTagManagerService,) {
  }

  ngOnInit() {
    if (isPlatform('mobile')) {
      StatusBar.setBackgroundColor({color:"#8020A0"}).catch(()=>{});
    }
    this.getUser()
  }
  ngAfterViewInit():void{
    if (this.isLoggedIn) {
      this.getSidebar()
    }
    this.router.events.forEach(item => {
      if (item instanceof NavigationEnd) {
          const gtmTag = {
              event: 'page',
              pageName: item.urlAfterRedirects
          };
          this.gtmService.pushTag(gtmTag);
      }
    });
  }
  afterViewinit(): void {

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

  getSidebar() {
    this.appPages = [
      { title: 'Dashboard', color: 'primary', url: 'home', icon: 'grid' },
      { title: 'About', color: 'warning', url: 'about', icon: 'reader' },
      { title: 'Expenses', color: 'success', url: 'expenses', icon: 'cash' },
      { title: 'Time', color: 'danger', url: 'work', icon: 'hourglass' },
      { title: 'Studies', color: 'primary', url: 'studies', icon: 'book' },
      // { title: 'Analytics', color: 'success', url: 'analytics', icon: 'analytics' },
      // { title: 'Setup', color: 'warning', url: 'setup', icon: 'settings' },
      { title: 'Profile', color: 'secondary', url: 'profile', icon: 'person' },
      { title: 'Need help', color: 'tertiary', url: 'help', icon: 'help-circle' }
    ];
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('login', { replaceUrl: true });
  }

}

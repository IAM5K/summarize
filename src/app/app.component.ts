import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { StatusBar, Style } from '@capacitor/status-bar';
import { isPlatform } from '@ionic/angular';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { FirebaseService } from './services/firebase/firebase.service';
import { ProfileService } from './services/profile/profile.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoggedIn: any = false;
  appPages: any = [
    { title: 'Dashboard', color: 'primary', url: 'home', icon: 'grid' },
    { title: 'About', color: 'medium', url: 'about', icon: 'reader' },
    {
      title: 'Help & Support',
      color: 'tertiary',
      url: 'help',
      icon: 'help-circle',
    },
    { title: 'Login', color: 'success', url: 'login', icon: 'log-in' },
  ];
  public labels: any = [];
  versionNumber: number = 2.0;
  constructor(
    private authService: AuthService,
    private router: Router,
    private gtmService: GoogleTagManagerService,
    private profileService:ProfileService,
    private firebaseService: FirebaseService

  ) {}

  ngOnInit() {
    if (isPlatform('mobile')) {
      StatusBar.setBackgroundColor({ color: '#8020A0' }).catch(() => {});
    }
    this.getUser();
  }
  ngAfterViewInit(): void {
    if (this.isLoggedIn) {
      this.getSidebar();
    }
    this.router.events.forEach((item) => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'page',
          pageName: item.urlAfterRedirects,
        };
        this.gtmService.pushTag(gtmTag);
      }
    });
  }
  afterViewInit(): void {}

  async getUser() {
    let userProfile;
    try {
      userProfile = await this.firebaseService.getUserProfile();
      this.profileService.userData = userProfile
      console.log(userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }

    if (userProfile.uid) {
      this.isLoggedIn = true;
      this.getSidebar();
    } else {
      this.isLoggedIn = false;
    }
  }

  getSidebar() {
    this.appPages = [
      { title: 'Dashboard', color: 'primary', url: 'home', icon: 'grid' },
      { title: 'About', color: 'medium', url: 'about', icon: 'reader' },
      { title: 'Goal', color: 'secondary', url: 'goal', icon: 'bulb' },
      { title: 'Expenses', color: 'success', url: 'expenses', icon: 'cash' },
      { title: 'Studies', color: 'primary', url: 'studies', icon: 'book' },
      { title: 'Time', color: 'danger', url: 'time', icon: 'hourglass' },
      {
        title: 'Achievements',
        color: 'warning',
        url: 'achievement',
        icon: 'trophy',
      },
      // { title: 'Analytics', color: 'success', url: 'analytics', icon: 'analytics' },
      // { title: 'Setup', color: 'warning', url: 'setup', icon: 'settings' },
      { title: 'Profile', color: 'secondary', url: 'profile', icon: 'person' },
      {
        title: 'Need help',
        color: 'tertiary',
        url: 'help',
        icon: 'help-circle',
      },
    ];
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('login', { replaceUrl: true });
  }
}

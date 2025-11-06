import { AfterViewInit, Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { AuthService } from "./auth/service/auth.service";
import { StatusBar } from "@capacitor/status-bar";
import { isPlatform, Platform } from "@ionic/angular";
import { GoogleTagManagerService } from "angular-google-tag-manager";
import { FirebaseService } from "./services/firebase/firebase.service";
import { ProfileService } from "./services/profile/profile.service";
import { SidenavService } from "./services/sidenav/sidenav.service";
import { Subscription } from "rxjs";
import { NotificationsService } from "./services/notifications/notifications.service";
import { FcmService } from "./services/fcm/fcm.service";
@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"],
    standalone: false
})
export class AppComponent implements OnInit, AfterViewInit {
  isLoggedIn: any = false;
  public appPages: any = [];
  public labels: any = [];
  versionNumber = "2.2.0";
  private loginStateSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private gtmService: GoogleTagManagerService,
    private profileService: ProfileService,
    private sidenavService: SidenavService,
    private firebaseService: FirebaseService,
    private notificationsService: NotificationsService,
    private platform: Platform,
    private fcm: FcmService,
  ) {
    this.platform
      .ready()
      .then(() => {
        this.fcm.initPush();
      })
      .catch((e) => {
        console.error("error fcm: ", e);
      });
  }

  ngOnInit() {
    this.firebaseService.getUserProfile();
    this.getUser();

    // Check and store device push token on app init (only on device)
    if (isPlatform("capacitor")) {
      this.notificationsService.ensureDeviceTokenStored().then((token) => {
        if (token) {
          console.debug("Device push token stored.");
        } else {
          console.debug("Device push token not available or permission denied.");
        }
      });
    }
  }
  ngAfterViewInit(): void {
    this.initGoogleTagManager();
    this.loginStateSubscription = this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.appPages = this.sidenavService.loggedInPages;
        this.sidenavService.setLoggedInPages();
      } else {
        this.appPages = this.sidenavService.defaultPages;
        this.sidenavService.setDefaultPages();
      }
    });

    try {
      StatusBar.setBackgroundColor({ color: "#3880ff" }).catch((error) => {
        if (!error || !error.message || !error.message.includes("not implemented on web")) {
          console.error("error while setting background color", error);
        }
      });
      if (isPlatform("capacitor")) {
        this.notificationsService.schedule9PMNotification();
        this.notificationsService.checkNotificationPreference();
      }
    } catch (error) {
      if (!error || !error.message || !error.message.includes("not implemented on web")) {
        console.error("Error with PushNotifications or related plugin:", error);
      }
    }
  }

  private initGoogleTagManager(): void {
    this.router.events.subscribe((event) => {
      try {
        if (event instanceof NavigationEnd) {
          const gtmTag = {
            event: "page_view",
            pageName: event.urlAfterRedirects,
          };
          this.gtmService.pushTag(gtmTag);
        }
      } catch (error) {
        console.error("Error occurred in Google Tag Manager:", error);
      }
    });
  }

  async getUser() {
    let userProfile;
    try {
      userProfile = await this.firebaseService.getUserProfile();
      this.profileService.userData = userProfile;
      // console.log(userProfile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }

    if (userProfile?.uid) {
      this.isLoggedIn = true;
      this.getSidebar();
    } else {
      this.isLoggedIn = false;
    }
  }

  getSidebar() {
    this.appPages = this.sidenavService.loggedInPages;
  }

  async logout() {
    await this.authService.logout();
    this.appPages = this.sidenavService.defaultPages;
    this.isLoggedIn = false;
    this.router.navigateByUrl("login", { replaceUrl: true });
  }
}

import { AfterViewInit, Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { AuthService } from "./auth/service/auth.service";
import { StatusBar } from "@capacitor/status-bar";
import { isPlatform } from "@ionic/angular";
import { GoogleTagManagerService } from "angular-google-tag-manager";
import { FirebaseService } from "./services/firebase/firebase.service";
import { ProfileService } from "./services/profile/profile.service";
import { SidenavService } from "./services/sidenav/sidenav.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
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
  ) {}

  ngOnInit() {
    if (isPlatform("mobile")) {
      StatusBar.setBackgroundColor({ color: "#3880ff" }).catch((error) => {
        console.error("error while setting background color", error);
      });
    }
    this.firebaseService.getUserProfile();
    this.getUser();
  }

  ngAfterViewInit(): void {
    this.initGoogleTagManager();
    this.loginStateSubscription = this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.appPages = this.sidenavService.loggedInPages;
        this.sidenavService.setLoggedInPages(); // Update appPages with logged-in pages
      } else {
        this.appPages = this.sidenavService.defaultPages;
        this.sidenavService.setDefaultPages(); // Update appPages with default pages
      }
    });
  }

  private initGoogleTagManager(): void {
    this.router.events.subscribe((event) => {
      try {
        if (event instanceof NavigationEnd) {
          const gtmTag = {
            event: "page_view",
            pageName: event.urlAfterRedirects,
          };
          console.log("pushing gtm from app module", gtmTag);
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

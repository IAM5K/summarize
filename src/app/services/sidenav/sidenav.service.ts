import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SidenavService {
  constructor() {}
  defaultPages = [
    { title: "Dashboard", color: "primary", url: "home", icon: "grid" },
    { title: "About", color: "medium", url: "about", icon: "reader" },
    {
      title: "Help & Support",
      color: "tertiary",
      url: "help",
      icon: "help-circle",
    },
    { title: "Login", color: "success", url: "login", icon: "log-in" },
  ];

  loggedInPages = [
    { title: "Dashboard", color: "primary", url: "home", icon: "grid" },
    { title: "About", color: "medium", url: "about", icon: "reader" },
    { title: "Goal", color: "secondary", url: "goal", icon: "bulb" },
    { title: "Expenses", color: "success", url: "expenses", icon: "cash" },
    { title: "Studies", color: "primary", url: "studies", icon: "book" },
    { title: "Time", color: "danger", url: "time", icon: "hourglass" },
    {
      title: "Achievements",
      color: "warning",
      url: "achievement",
      icon: "trophy",
    },
    // { title: 'Analytics', color: 'success', url: 'analytics', icon: 'analytics' },
    // { title: 'Setup', color: 'warning', url: 'setup', icon: 'settings' },
    { title: "Profile", color: "secondary", url: "profile", icon: "person" },
    {
      title: "Need help",
      color: "tertiary",
      url: "help",
      icon: "help-circle",
    },
  ];
  appPages = this.defaultPages;

  setLoggedInPages(){
    this.appPages= this.loggedInPages;
    
  }

  setDefaultPages(){
    this.appPages= this.defaultPages
  }
}

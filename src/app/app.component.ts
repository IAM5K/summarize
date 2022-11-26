import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages=[
    { title: 'Dashboard', color:'primary', url: 'home', icon: 'grid' },
    { title: 'Expences', color:'success', url: 'expences', icon: 'cash' },
    { title: 'Office', color:'danger', url: 'office', icon: 'briefcase' },
    { title: 'Analytics', color:'success', url: 'analytics', icon: 'analytics' },
    // { title: 'Appointments', color:'tertiary', url: 'appointments', icon: 'calendar' },
    // { title: 'Organisations', color:'warning', url: 'organisations', icon: 'globe' },
    // { title: 'Users', color:'purple', url: 'users', icon: 'people' },
    // { title: 'Notifications', color:'danger', url: 'notifications', icon: 'notifications' },
    { title: 'Setup', color:'warning', url: 'setup', icon: 'settings' },
    { title: 'Contact Us', color:'tertiary', url: 'support', icon: 'paper-plane' }
  ];
  public labels = ['Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}

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
  paragraphs=[
    "Summarize is an app that helps you to manage your Time, Money, and work which includes but not limitted to subject wise studies, notes, to-do's or office works.",
    "It will also help you to analyze your expenditure of resources and will suggest approaches to manage them in a better way. All these featres will be provided only if you want. You may find many more apps on internet that announces to help you manage resource and increase your savings but ends up in increasing your expences by using your data to show relevant ads or offering some tempting deals.",
    "Currently it is under development, so we will soon be adding features one by one. Till then please feel free to use our expence feature to manage your expences.",
    "Your data will not be used for any advertisement or offering any deal / scheme. For more queries you can contact us through support page.(Will be available soon). We are also open to feature request and suggestions."
  ]
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

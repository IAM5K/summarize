import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo/seo.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  pageTitle="Help & Support"
  pageMetaTags=[
    {
      name:'description',
      content:"Summarize all your expences here. Summarize will help you to check them down in the list immediately and later Analyze them to have an understanding about where you can spend wisely and how to manage your expences in better way. Soon we will also give finance tips that will help you better."
    },
    {
      name:'keyword',
      content:'Summarize, Summarize, arise, arize, money managemnet, expense management, cost analysis,summarize-ng, summarize-ng, digital dairy, expense analysis'
    },
    {
      name:'author',
      content:'Sandeep Kumar'
    }
  ];
  constructor(
    private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.seo(this.pageTitle,this.pageMetaTags)
  }

}

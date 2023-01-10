import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { SeoService } from 'src/app/services/seo/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  pageTitle="About Summarize"
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
  infoNote=""
  constructor(
    private swUpdate: SwUpdate,
    private seoService: SeoService
    ) { }

  ngOnInit() {

    this.seoService.seo(this.pageTitle,this.pageMetaTags)
    let updateCount=0
    this.swUpdate.versionUpdates.subscribe(()=>{
      this.infoNote ="Checking for update..."
      if(confirm('Update Available, do you want to install it?') && updateCount<5){
        updateCount = updateCount+1;
        window.location.reload();
        this.infoNote="Updated."
      }
    })
  }

}

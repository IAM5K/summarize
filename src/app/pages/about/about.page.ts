import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  pageTitle="About Summarize"
  constructor(
    private swUpdate: SwUpdate
    ) { }

  ngOnInit() {
    this.swUpdate.versionUpdates.subscribe(()=>{
      if(confirm('Update Available, do you want to install it?')){
        window.location.reload();
      }
    })
  }

}

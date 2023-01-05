import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  pageTitle="About Summarize"
  infoNote=""
  constructor(
    private swUpdate: SwUpdate
    ) { }

  ngOnInit() {
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

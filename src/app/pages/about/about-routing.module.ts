import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutPage } from './about.page';
import { HowtoComponent } from './howto/howto.component';

const routes: Routes = [
  {
    path: '',
    component: AboutPage
  },
  {
    path: 'howto',
    component: HowtoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutPageRoutingModule {}

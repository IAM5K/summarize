import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqComponent } from './faq/faq.component';

import { HelpPage } from './help.page';

const routes: Routes = [
  {
    path: '',
    component: HelpPage
  },
  {
    path: 'contact',
    component: FaqComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpPageRoutingModule {}

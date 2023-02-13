import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutPage } from './about.page';
import { HofComponent } from './components/hof/hof.component';
import { HowtoComponent } from './components/howto/howto.component';
import { UpdateComponent } from './components/update/update.component';

const routes: Routes = [
  {
    path: '',
    component: AboutPage
  },
  {
    path: 'howto',
    component: HowtoComponent
  },
  {
    path: 'hof',
    component: HofComponent
  },
  {
    path: 'update',
    component: UpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutPageRoutingModule {}

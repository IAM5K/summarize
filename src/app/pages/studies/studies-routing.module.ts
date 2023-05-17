import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudiesPage } from './studies.page';
import { EditStudiesComponent } from './components/edit-studies/edit-studies.component';

const routes: Routes = [
  {
    path: '',
    component: StudiesPage
  },
  {
    path:'edit-studies',
    component:EditStudiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudiesPageRoutingModule {}

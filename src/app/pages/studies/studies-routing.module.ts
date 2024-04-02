import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StudiesPage } from "./studies.page";
import { EditStudiesComponent } from "./components/edit-studies/edit-studies.component";
import { FreeResourceComponent } from "./components/free-resource/free-resource.component";
import { AdvancedStudiesComponent } from "./components/advanced-studies/advanced-studies.component";

const routes: Routes = [
  {
    path: "",
    component: StudiesPage,
  },
  {
    path: "edit-studies",
    component: EditStudiesComponent,
  },
  {
    path: "free-resource",
    component: FreeResourceComponent,
  },
  {
    path: "advanced-studies",
    component: AdvancedStudiesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudiesPageRoutingModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginPage } from "./login.page";
import { ResetPasswordComponent } from "../reset-password/reset-password.component";

const routes: Routes = [
  {
    path: "",
    component: LoginPage,
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}

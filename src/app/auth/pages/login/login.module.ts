import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { LoginPageRoutingModule } from "./login-routing.module";

import { LoginPage } from "./login.page";
import { ResetPasswordComponent } from "../reset-password/reset-password.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, LoginPageRoutingModule],
  declarations: [LoginPage, ResetPasswordComponent],
})
export class LoginPageModule {}

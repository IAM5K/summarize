import { Component } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { ToasterService } from "src/app/services/toaster/toaster.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent {
  pageTitle = "Reset password";
  email: string;

  constructor(
    private authService: AuthService,
    private toaster: ToasterService,
  ) {}

  async resetPassword() {
    try {
      await this.authService.resetPassword(this.email);
      this.toaster.showToast("Password reset email sent!", "success");
    } catch (error) {
      console.log(error);

      if (error.code === "auth/user-not-found") {
        this.toaster.showToast("No user found with this email.", "warning");
      } else {
        this.toaster.showToast("Error resetting password. Please try again.", "warning");
      }
    }
  }
}

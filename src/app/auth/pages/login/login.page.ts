import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { SeoTags } from "src/app/models/class/seoTags/seo";
import { SeoService } from "src/app/services/seo/seo.service";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;
  pageTitle: string = "Login Page";
  pageMetaTags = SeoTags.loginPageTags;
  title = SeoTags.pageTitle.loginPage;
  loginMode: boolean = true; // Indicates whether the user is in login or registration mode
  loginForm: FormGroup;
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private seoService: SeoService,
  ) {}

  // Easy access for form fields
  get email() {
    return this.credentials.get("email");
  }

  get password() {
    return this.credentials.get("password");
  }
  get errorControl() {
    return this.credentials.controls;
  }

  ngOnInit() {
    this.seoService.seo(this.title, this.pageMetaTags);
    // this.credentials = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // });
    this.initForms();
  }
  initForms() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      verifyPassword: ["", Validators.required],
    });
  }
  toggleMode() {
    this.loginMode = !this.loginMode;
    this.clearForms();
  }

  clearForms() {
    this.loginForm.reset();
    this.registerForm.reset();
  }

  passwordsMatch(): boolean {
    const password = this.registerForm.get("password").value;
    const verifyPassword = this.registerForm.get("verifyPassword").value;
    return password === verifyPassword;
  }
  forgotPassword() {
    // Logic to handle forgot password
  }
  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(
      this.credentials.value.email,
      this.credentials.value.password,
    );
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl("/home", { replaceUrl: true });
    } else {
      this.showAlert("Registration failed", "Please try again!");
    }
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password,
    );
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl("/home", { replaceUrl: true });
    } else {
      this.showAlert("Login failed", "Please try again!");
    }
  }
  async loginWithGoogle() {
    const user = await this.authService.googleSignin();
    if (user !== (null || undefined)) {
      this.showAlert(
        "Login Success",
        "Welcome to Summarize...\nNavigate Manually in case of delay.",
      );
      this.router.navigateByUrl("/home", { replaceUrl: true });
    } else {
      this.showAlert("Login failed", "Please try again!");
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["OK"],
    });
    await alert.present();
  }
}

import { Component, OnInit } from "@angular/core";
import { AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { serverTimestamp } from "@angular/fire/firestore";
import { SeoService } from "src/app/services/seo/seo.service";
import { SupportService } from "src/app/services/support/support.service";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.scss"],
})
export class FaqComponent {
  title = "Contact";
  isSubmitted=false;
  constructor(
    private supportService: SupportService,
    public formBuilder: FormBuilder) { }
  supportForm = this.formBuilder.group({
    createdAt: [serverTimestamp()],
    name: ["", [Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z ]*$")]],
    email: ["", [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
    sub: ["", [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z 0-9 ]*$")]],
    msg: ["", [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z 0-9 ., \n]*$")]]
  })

  submitForm(){
    this.supportService.postSupport(this.supportForm.value).then(res=>{
      this.supportForm.reset( {} )
      this.isSubmitted=true
      setTimeout(() => {
      this.isSubmitted=false
      }, 15000);
    }).catch(err=>{
      // console.log(err);
    })
  }

  get errorControl() {
    return this.supportForm.controls;
  }
  get email() {
    return this.supportForm.get("email")
  }
  get name() {
    return this.supportForm.get("name")
  }
  get mobile() {
    return this.supportForm.get("mobile")
  }
  get sub() {
    return this.supportForm.get("sub")
  }
  get msg() {
    return this.supportForm.get("msg")
  }

}

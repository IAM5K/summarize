import { Injectable } from "@angular/core";
import { AngularFireFunctions } from "@angular/fire/compat/functions";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MLService {
  constructor(private functions: AngularFireFunctions) {}

  analyzeDescription(text: string): Observable<any> {
    const callable = this.functions.httpsCallable("analyzeExpenseDescription");
    return callable({ text });
  }
}

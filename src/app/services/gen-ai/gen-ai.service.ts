import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const GEMINI_KEY = "";
const genAI = new GoogleGenerativeAI(GEMINI_KEY);

@Injectable({
  providedIn: "root",
})
export class GenAiService {
  private functionsBaseUrl: string;

  constructor(private http: HttpClient) {
    // Construct the base URL for Firebase Functions
    // For local testing, it might be http://localhost:5001/{project-id}/asia-south1/api
    // For production, it will be https://asia-south1-{project-id}.cloudfunctions.net/api
    this.functionsBaseUrl = `${environment.firebaseFunctionsUrl}/summarize-ng/us-central1`;
  }

  processExpenseData(expenseData: string): Observable<any> {
    const url = `${this.functionsBaseUrl}/processExpenseText`;
    console.log("url", url);
    console.log("expense data payload", expenseData);
    return this.http.post(url, { expenseData });
  }
}

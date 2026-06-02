import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { AuthService } from "src/app/auth/service/auth.service";
import { getDatabase, ref, get } from "firebase/database";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class GeminiService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  constructor() {}

  // private async getApiKey(): Promise<string | null> {
  //   const user = this.authService.user;
  //   if (!user) return null;

  //   const db = getDatabase();
  //   const snapshot = await get(ref(db, path));
  //   if (snapshot.exists()) {
  //     return snapshot.val().geminiApiKey || null;
  //   }
  //   return null;
  // }

  async processExpenseDescription(description: string, today: string): Promise<any[]> {
    const apiKey = localStorage.getItem("geminiApiKey") || environment.geminiKey;
    if (!apiKey) {
      throw new Error("Gemini API Key not found. Please add it in your profile.");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

    const prompt = `
    You are a financial expense parser. Your goal is to extract expenses and merge them by category.

    ### GOAL
    Extract every expense from the input. If multiple items share the same DATE, TYPE, and SPENDEDON, you MUST merge them into a single JSON object, summing their amounts.

    ### JSON SCHEMA
    [{
      "date": "YYYY-MM-DD",
      "amount": number,
      "description": "Item (Vendor): Price \\n Item (Vendor): Price",
      "type": "grocery | food | travel | shopping | bill | medical | education | other",
      "spendedOn": "self | group | family", // default to self
      "reimburseable": boolean // default to false
    }]

    ### CATEGORY HINTS
    - grocery: supermarket, dmart, vegetables, milk
    - food: restaurant, dosa, juice, sweets, meals
    - travel: metro, bus, train, auto, fuel
    - Context: "group" (friends/we), "family" (home/wife/kids), "reimburseable" (office/work/claim).

    ### EXAMPLE OF MERGING (CRITICAL)
    Input: "Today: 2026-03-08. Spent 50 on coffee and 100 on a sandwich."
    Output: [{
      "date": "2026-03-08",
      "amount": 150,
      "description": "Coffee: 50 \\n Sandwich: 100",
      "type": "food",
      "spendedOn": "self",
      "reimburseable": false
    }]

    ### TASK
    Today's Date: ${today}
    Input: "${description}"

    Return ONLY valid JSON. Summarize and merge categories strictly.
    `;

    const body = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    try {
      const response: any = await firstValueFrom(this.http.post(url, body));
      const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("Empty response from AI");

      const cleanJson = text.replace(/```json|```/g, "").trim();
      const parsedData = JSON.parse(cleanJson);

      return Array.isArray(parsedData) ? parsedData : [parsedData];
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to process expense statement.");
    }
  }

  async translateQuestion(questionData: any, targetLanguage: string = "Hindi"): Promise<any> {
    // const apiKey = await this.getApiKey();
    const apiKey = localStorage.getItem("geminiApiKey") || environment.geminiKey;
    if (!apiKey) {
      throw new Error("Gemini API Key not found. Please add it in your profile.");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

    const prompt = `
      You are an expert educational content translator. 
      Your task is to translate the following educational content into ${targetLanguage}.
      Return ONLY valid JSON in the same structure.
      
      Input Data:
      ${JSON.stringify(questionData)}
    `;

    const body = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    try {
      const response: any = await firstValueFrom(this.http.post(url, body));

      const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("Empty response from AI");

      // Extract JSON from potential markdown markers
      const cleanJson = text.replace(/```json|```/g, "").trim();
      const translatedObject = JSON.parse(cleanJson);

      console.log("GeminiService: Transformed Translated Object:", translatedObject);

      return translatedObject;
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      const errorMsg = error.error?.error?.message || error.message || "Failed to translate question.";

      if (errorMsg.includes("429")) {
        throw new Error("AI Quota exceeded. Please wait a minute and try again.");
      }

      throw new Error(errorMsg);
    }
  }
}

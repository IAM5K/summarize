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
      Act as a high-precision financial parser. Extract expenses from the input text and convert them into a JSON array.
      Current Date (Today): ${today}.
      Return ONLY a JSON array. No conversational text.

      JSON Structure:
      {
        "date": "YYYY-MM-DD",
        "amount": number, // Total for the Date + Category group
        "description": "string", // Itemized: "Item: Price \\n Item: Price"
        "type": "string", // category: grocery, food, travel, education, shopping, bill, medical, etc.
        "spendedOn": "self" | "group" | "family", // default to self
        "reimburseable": boolean // default to false
      }

      Strict Extraction Rules:
      1. Flexible Parsing: Accurately identify dates, items, and prices regardless of how they are phrased (e.g., "On Jan 5th spent 50 on milk" or "50 milk 05/01/26").
      2. Grouping: Club all items that share the SAME DATE, SAME CATEGORY, and SAME 'spendedOn' status into a single JSON object.
      3. Calculation: Sum up individual item amounts (handling quantities if mentioned) for the final 'amount'.
      4. Date Standardization: Convert all relative dates (today, yesterday) or formatted dates into YYYY-MM-DD.
      5. Description: Provide an itemized list of all items in the group using the "Item: Price \\n Item: Price" format. 
         - If a location or vendor is mentioned (e.g., "at Dominos", "from Amazon", "at local market"), include it in the description (e.g., "Pizza (at Dominos): 500").
      6. Contextual Properties:
         - 'spendedOn': Detect if it's for "group" (keywords: group, friends, shared, we, us), "family" (keywords: family, kids, home, wife), or "self" (default).
         - 'reimburseable': Set to true if keywords like "office", "work", "reimburse", "claim", or "company" are mentioned. Default is false.
      7. Completeness: Ensure NO item mentioned in the text is skipped. Every single transaction must be accounted for.
      8. Categorization: Intelligently assign a 'type' based on the items (e.g., vegetables/milk -> grocery, restaurant/chicken -> food).

      Input: "${description}"
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

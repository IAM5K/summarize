import * as functions from "firebase-functions";
import { HarmBlockThreshold, HarmCategory, VertexAI } from "@google-cloud/vertexai";
import { SystemInstruction } from "./models/classes/system-instruction.class";

// Initialize Vertex AI with your project ID and location
const vertex_ai = new VertexAI({
  project: "summarize-ng",
  location: "asia-south1",
});

const model = "gemini-1.5-flash-002";

const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 1,
    topP: 0.95,
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
  systemInstruction: new SystemInstruction().prompt,
});

export const processExpenseText = functions.https.onRequest(async (req:any, res:any) => {
  try {
    const { expenses } = req.body.expenseData;

    const contentRequest = {
      contents: [{ role: "user", parts: [{ text: expenses }] }],
    };

    const streamingResp = await generativeModel.generateContentStream(contentRequest);
    let responseData = "";

    for await (const item of streamingResp.stream) {
      const castedItem = item as { text: string };
      responseData += castedItem.text;
    }

    res.status(200).send({
      success: true,
      data: JSON.parse(responseData),
    });
  } catch (error) {
    console.error("Error processing expenses:", error);
    res.status(500).send({
      success: false,
      error: "An error occurred while processing expenses.",
    });
  }
});

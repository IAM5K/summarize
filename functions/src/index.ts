/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
import {onRequest} from "firebase-functions/v2/https";
import * as cors from "cors";
import * as logger from "firebase-functions/logger";

// Configure CORS
const corsHandler = cors({
  origin: ["http://localhost:8100", "https://summarize-ng.web.app", "https://sumarize.web.app"],
});

export const helloWorld = onRequest((request, response) => {
  // Allow CORS
  corsHandler(request, response, () => {
    const templateData = {
      message: "Hello from Firebase!",
      timestamp: new Date().toISOString(),
    };

    logger.info("Hello logs!", {structuredData: true});

    response.status(200).json({data: templateData});
  });
});

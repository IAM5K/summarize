Based on our discussion and the reference image provided, here is the detailed Requirement Summary for the **"ExpenseAI"** application.

This specification aligns the visual style in your image (clean, dark mode, card-based) with the "Bring Your Own Token" architecture and the 4-mode logging system we planned.

---

### **1. Global Architecture & Setup**

* **Platform:** Android (via Capacitor) & Web.
* **Framework:** Angular 18+ (Standalone Components, Signals).
* **Backend:** Firebase (Auth, Firestore).
* **Offline Logic:** `Dexie.js` (IndexedDB) for batch queueing.
* **AI Engine:** Google Gemini 1.5 Flash (Client-side execution).
* **Privacy:** API Key stored in `localStorage`; User data flow is strictly `Device <-> Google AI` and `Device <-> Firebase`.

---

### **2. Screen 1: Settings / Onboarding (The Setup)**

**Purpose:** The gatekeeper screen where users enable the AI features by providing their key.

* **UI Elements:**
* **Input Field:** "Paste Gemini API Key" (Obscured text).
* **Toggle:** "Enable AI Features" (Disabled until key is valid).
* **Model Selector:** "Standard (Flash)" vs "Pro" (Radio buttons).
* **Privacy Note:** "Your key is stored only on this device. Google may use data from free keys for training."


* **Functionality:**
* Validate key format (regex check) before saving to `localStorage`.
* Initialize `GeminiService` upon successful save.

---

### **3. Screen 2: Add Expense (The Primary Interface)**

**Reference:** The attached image.
**Purpose:** A unified hub for all 4 types of input.

#### **Section A: The "Quick Actions" (AI Inputs)**

* **Visual:** Two large, prominent cards (as seen in image) + a "Smart Text" hint.
1. **Card 1: "Scan Receipt"**
* **Action:** Triggers `@capacitor/camera`.
* **Behavior:** Opens native camera. User snaps photo.
* **Logic:**
* **Single Mode:** Sends immediately to Gemini -> Navigates to **Review Screen**.
* **Batch Mode (Long Press or Toggle):** Adds image to `Dexie` DB -> Shows "Added to Queue" toast -> Camera stays open for next shot.

2. **Card 2: "Voice Input"**
* **Action:** Triggers `@capacitor-community/voice-recorder`.
* **Behavior:**
* **Tap:** Starts recording (pulsing animation).
* **Tap Again:** Stops -> Sends audio blob to Gemini -> Auto-fills the form fields below (Amount, Category, Date, Note).

3. **Smart Hint:** *"Try saying: '$15 lunch at Subway'"*
* **Action:** This text is actually an input field (or opens one).
* **Behavior:** User types natural language -> `GeminiService` parses it -> Auto-fills form.


#### **Section B: Manual Entry / AI Result Container**

* **Visual:** The form below the cards (Amount, Category, Date).
* **Behavior:**
* If AI is used, these fields **animate/populate automatically**.
* If AI is skipped, user manually taps to enter data.


* **Fields:**
* **Amount:** Large, center-aligned (e.g., "0.00 $").
* **Category:** Horizontal scrollable pills (Food, Transport, Shopping). *Selection highlights in Blue.*
* **Date:** Native Date Picker (Default: Today).
* **Note:** Simple text input.



#### **Section C: Action Bar**

* **Button:** "Save Expense" (Full width, Blue).
* **Logic:** Saves final data to Firestore `users/{uid}/expenses`.

---

### **4. Screen 3: The Review & Queue (Batch Mode Hub)**

**Purpose:** Manage the "Scan & Forget" workflow.

* **UI Layout:** A tab or list view titled "Processing Queue".
* **Visual Representation:**
* **List Items:** Thumbnail of receipt + Status Indicator.
* 🔄 **Spinning:** "Analyzing..." (Processing in background).
* ⏳ **Clock:** "Waiting" (Throttled by 4s delay).
* ✅ **Check:** "Done" (Saved to Drafts).
* ⚠️ **Alert:** "Failed" (Tap to retry).

* **Functionality:**
* **QueueService:** Watches `Dexie` DB. Processes 1 image every 4-5 seconds.
* **Pause/Resume:** Global toggle to stop processing (e.g., to save battery).

---

### **5. Screen 4: Home / Dashboard (Expense List)**

**Purpose:** View and manage saved expenses.

* **UI Elements:**
* **Total Balance:** Monthly spend vs Budget.
* **Recent Transactions:** List of expense cards.
* **"Drafts" Section:** (Crucial)
* If Batch Mode processed 20 receipts, they appear here first.
* User must "Approve" them to move them to the main ledger.

* **Search/Filter:** By Category, Date, or "Smart Search" (e.g., "Show me all coffee receipts").

---

### **Implementation Roadmap Checklist**

1. **Phase 1 (Skeleton):** Build the "Add Expense" UI exactly matching your image using Angular Standalone Components and Tailwind/Ionic CSS.
2. **Phase 2 (Logic):** Connect `@capacitor/camera` and `voice-recorder` to the buttons.
3. **Phase 3 (Brain):** Implement `GeminiService` to take the outputs of Phase 2 and auto-fill the form variables (Signals).
4. **Phase 4 (Queue):** Implement the `Dexie` + `RxJS` loop for the batch mode.

---

Since you are building a **Capacitor Android App** (not just a PWA) and want to be "Angular 20 ready," we need to be strict about using **Native Plugins** (for performance) and **Angular Signals** (the future standard).

Here is your Modern Architecture & Implementation Plan.

---

### **1. The "Angular 20 Ready" Tech Stack**

To ensure full compatibility with future Angular updates (Zoneless hydration, Signals), we will avoid wrapper libraries that might get abandoned.

| Feature      | Recommended Package                   | Why this choice?                                                                                              |
| ------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Camera**   | `@capacitor/camera`                   | Official, maintained, and handles Android permissions natively better than `ngx-webcam`.                      |
| **Audio**    | `@capacitor-community/voice-recorder` | Web Audio API is buggy on some Android WebViews. This native plugin ensures clean `.aac` or `.wav` recording. |
| **Local DB** | `dexie` (IndexedDB wrapper)           | Lightweight, promise-based, and perfect for the "Batch Queue".                                                |
| **State**    | **Angular Signals**                   | Replace `BehaviorSubject` where possible. It prepares you for "Zoneless" Angular.                             |
| **Firebase** | **Modular SDK** (Official)            | use `AngularFire` for max compatibility alignment.                                                            |

---

### **2. Core Service: The "AI Brain" (Gemini)**

This service needs to be generic enough to handle Text, Images, and Audio.

```typescript
// services/gemini.service.ts
import { Injectable, signal } from '@angular/core';
import { GoogleGenerativeAI } from '@google/genai';

@Injectable({ providedIn: 'root' })
export class GeminiService {
  // Use Signal to track API Key (Reactive)
  private apiKey = signal<string>(localStorage.getItem('gemini_key') || '');

  async generate(prompt: string, inlineData?: { data: string; mimeType: string }) {
    if (!this.apiKey()) throw new Error('API Key missing');

    const genAI = new GoogleGenerativeAI(this.apiKey());
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      // Force JSON for consistent parsing
      generationConfig: { responseMimeType: "application/json" } 
    });

    const parts: any[] = [prompt];
    if (inlineData) {
      parts.push({ inlineData });
    }

    const result = await model.generateContent(parts);
    return JSON.parse(result.response.text());
  }
}

```

---

### **3. Implementation Plan: The 4 Logging Modes**

#### **Mode A: Image Logging (Single Receipt)**

* **UX:** User taps "Camera" -> Snaps photo -> Review Screen -> Save.
* **Tech:** `@capacitor/camera` returns a Base64 string directly.

**Code Snippet:**

```typescript
async captureReceipt() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Base64
  });

  const prompt = `Extract expense: Amount, Merchant, Date, Category.`;
  // Call Gemini with image.base64String and mimeType 'image/jpeg'
}

```

#### **Mode B: Voice Logging (Audio Recording)**

* **UX:** User holds a "Mic" button -> Speaks -> Releases -> Processing.
* **Tech:** `@capacitor-community/voice-recorder`.
* **Why Native?** It handles the microphone permission popup on Android correctly.

**Code Snippet:**

```typescript
import { VoiceRecorder } from '@capacitor-community/voice-recorder';

async startRecording() {
  await VoiceRecorder.startRecording();
}

async stopAndAnalyze() {
  const result = await VoiceRecorder.stopRecording();
  const audioBase64 = result.value.recordDataBase64;
  
  // Prompt for Gemini
  const prompt = `
    Listen to this audio. The user is describing expenses. 
    Extract a JSON list of expenses. 
    Today's date is: ${new Date().toISOString()}.
  `;
  
  // Call Gemini with audioBase64 and mimeType 'audio/aac'
}

```

#### **Mode C: Text Logging (Natural Language)**

* **UX:** A simple text area. The user can type or use **Gboard Voice Typing** (Mic icon on keyboard).
* **Tech:** Standard HTML `<textarea>`.
* **Strategy:** This is the cheapest and fastest method.
* **Prompt Injection:** You *must* inject "Today's Date" so Gemini understands "Yesterday" or "Last Sunday".

#### **Mode D: Batch Mode (The "Scan & Forget" Queue)**

This is the most complex part. We use `Dexie` to store images and a background "Looper" to process them.

**1. The Database (`db.ts`):**

```typescript
import Dexie, { Table } from 'dexie';

export interface QueueItem {
  id?: number;
  base64: string;
  status: 'PENDING' | 'DONE' | 'ERROR';
  timestamp: number;
}

export class AppDB extends Dexie {
  queue!: Table<QueueItem, number>;
  constructor() {
    super('ExpenseDB');
    this.version(1).stores({ queue: '++id, status' });
  }
}
export const db = new AppDB();

```

**2. The Queue Manager (Signal-based):**
We use a **Signal** to expose the queue status to the UI (e.g., "Processing 3 of 10").

```typescript
// services/queue.service.ts
import { Injectable, signal } from '@angular/core';
import { db } from './db';

@Injectable({ providedIn: 'root' })
export class QueueService {
  // Signal for UI: { total: 10, pending: 4 }
  queueState = signal({ pending: 0, processing: false });

  async addToQueue(base64Image: string) {
    await db.queue.add({ 
      base64: base64Image, 
      status: 'PENDING', 
      timestamp: Date.now() 
    });
    this.updateState();
    this.processNext(); // Trigger the loop
  }

  private async processNext() {
    // If already running, don't start parallel threads (Rate Limit protection)
    if (this.queueState().processing) return;

    const nextItem = await db.queue.where('status').equals('PENDING').first();
    if (!nextItem) return;

    // 1. Lock the process
    this.queueState.update(s => ({ ...s, processing: true }));

    try {
      // 2. Call Gemini (Wait for it)
      const data = await this.geminiService.generate(..., nextItem.base64);
      
      // 3. Save to Firestore
      await this.firestoreService.save(data);

      // 4. Mark Done
      await db.queue.update(nextItem.id!, { status: 'DONE' });
      
      // 5. ARTIFICIAL DELAY (Rate Limit Protection for Free Tier)
      // Wait 4 seconds so we never exceed 15 RPM
      await new Promise(r => setTimeout(r, 4000));

    } catch (err) {
      console.error(err);
      await db.queue.update(nextItem.id!, { status: 'ERROR' });
    } finally {
      // 6. Unlock and Recursion
      this.queueState.update(s => ({ ...s, processing: false }));
      this.updateState();
      this.processNext(); // Loop to next item
    }
  }

  private async updateState() {
    const count = await db.queue.where('status').equals('PENDING').count();
    this.queueState.update(s => ({ ...s, pending: count }));
  }
}

```

---

### **4. UI/UX Strategy: The "Draft" Layer**

Since AI is probabilistic, never save directly to your main `Expenses` collection.

1. **Staging Area:** When Gemini returns data, save it to a `Drafts` collection (or local state).
2. **Review UI:**
* Show the scanned data in a nice Card.
* **Confidence Check:** If Gemini returns a low confidence (optional feature), highlight the field in Red.
* **Swipe Actions:** Swipe Right to "Confirm & Archive", Swipe Left to "Edit".



### **5. Summary Checklist for You**

1. **Install Native Plugins:**
`npm install @capacitor/camera @capacitor-community/voice-recorder dexie`
2. **Configure Android Manifest:**
Add permissions for `CAMERA`, `READ_EXTERNAL_STORAGE`, and `RECORD_AUDIO`.
3. **Build the Settings Page:**
Create the input field for the "Gemini API Key" and save it to `localStorage`.
4. **Implement Queue UI:**
Add a small floating widget in the header: *"3 receipts processing..."* that listens to the `queueState` signal.

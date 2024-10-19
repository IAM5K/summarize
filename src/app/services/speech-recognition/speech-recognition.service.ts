import { Injectable } from "@angular/core";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { Platform } from "@ionic/angular";

// Declare webkitSpeechRecognition for web browsers
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: "root",
})
export class SpeechRecognitionService {
  recognition: any; // Web Speech API recognition object
  public textInput: string = "";
  public finalTranscript: string = "";

  constructor(private platform: Platform) {}

  // Start speech recognition based on platform
  async startRecognition(callback: (text: string) => void) {
    if (this.platform.is("capacitor")) {
      // For native platforms (iOS/Android)
      this.startNativeRecognition(callback);
    } else {
      // For web platforms
      this.startWebRecognition(callback);
    }
  }

  // Stop speech recognition based on platform
  async stopRecognition() {
    if (this.platform.is("capacitor")) {
      this.stopNativeRecognition();
    } else {
      this.stopWebRecognition();
    }
  }

  // Native speech recognition (Capacitor)
  private async startNativeRecognition(callback: (text: string) => void) {
    try {
      const available = await SpeechRecognition.available();
      if (!available) {
        alert("Speech recognition not available on this device.");
        return;
      }

      const hasPermission = await SpeechRecognition.hasPermission();
      if (!hasPermission) {
        await SpeechRecognition.requestPermission();
      }

      await SpeechRecognition.start({
        language: "en-US",
        partialResults: true,
        popup: false,
      });

      // Listen for partial results
      SpeechRecognition.addListener("partialResults", (data: any) => {
        if (data.matches && data.matches.length > 0) {
          callback(data.matches.join(" ")); // Send recognized text to the callback
        }
      });
    } catch (error) {
      console.error("Error starting native speech recognition:", error);
    }
  }

  // Stop native speech recognition
  private async stopNativeRecognition() {
    try {
      await SpeechRecognition.stop();
      SpeechRecognition.removeAllListeners();
    } catch (error) {
      console.error("Error stopping native speech recognition:", error);
    }
  }

  // Web speech recognition
  private startWebRecognition(callback: (text: string) => void) {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      console.log("Speech recognition started.");
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        } else {
          interimTranscript += event.results[i][0].transcript + " ";
        }
      }

      // Append final transcript without resetting the input
      this.textInput += finalTranscript || interimTranscript;
      callback(this.textInput.trim());
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
    };

    recognition.start();
    this.recognition = recognition; // Store the recognition instance
  }

  // Stop web speech recognition
  private stopWebRecognition() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}

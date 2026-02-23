import { Injectable, NgZone } from "@angular/core";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { Platform } from "@ionic/angular";
import { SpeechRecognitionEvent } from "src/app/models/interface/speechRecognition.interface";

// Declare webkitSpeechRecognition for web browsers
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: "root",
})
export class SpeechRecognitionService {
  private recognition: any;
  private timeout: any;
  private finalTranscript: string = "";
  private isNative: boolean;
  private stoppedManually = false;
  private readonly INACTIVITY_TIMEOUT_MS = 8000;

  constructor(private platform: Platform, private zone: NgZone) {
    this.isNative = this.platform.is("hybrid");
  }

  async startRecognition(callback: (text: string) => void) {
    this.finalTranscript = "";
    this.stoppedManually = false;

    if (this.isNative) {
      await this.startNativeRecognition(callback);
    } else {
      await this.startWebRecognition(callback);
    }
    
    this.triggerHaptic(ImpactStyle.Light);
  }

  async stopRecognition() {
    this.stoppedManually = true;
    if (this.isNative) {
      await this.stopNativeRecognition();
    } else {
      await this.stopWebRecognition();
    }
    this.triggerHaptic(ImpactStyle.Medium);
  }

  private async startNativeRecognition(callback: (text: string) => void) {
    try {
      const available = await SpeechRecognition.available();
      if (!available.available) {
        alert("Speech recognition not available on this device.");
        return;
      }

      const permissionStatus = await SpeechRecognition.checkPermissions();
      if (permissionStatus.speechRecognition !== "granted") {
        const requestResult = await SpeechRecognition.requestPermissions();
        if (requestResult.speechRecognition !== "granted") {
          return;
        }
      }

      await SpeechRecognition.start({
        language: "en-US",
        partialResults: true,
        popup: false,
      });

      SpeechRecognition.addListener("partialResults", (data: { matches: string[] }) => {
        this.zone.run(() => {
          if (data.matches && data.matches.length > 0) {
            // Capacitor plugin usually returns the full transcript in matches[0]
            callback(data.matches[0].trim());
          }
          this.resetInactivityTimeout(callback);
        });
      });

      this.resetInactivityTimeout(callback);
    } catch (error) {
      console.error("Native recognition error:", error);
    }
  }

  private async stopNativeRecognition() {
    try {
      await SpeechRecognition.stop();
      SpeechRecognition.removeAllListeners();
      clearTimeout(this.timeout);
    } catch (error) {
      console.error("Error stopping native recognition:", error);
    }
  }

  private async startWebRecognition(callback: (text: string) => void) {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-US";

    this.recognition.onstart = () => {
      this.resetInactivityTimeout(callback);
    };

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.finalTranscript += event.results[i][0].transcript + " ";
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      this.zone.run(() => {
        callback((this.finalTranscript + interimTranscript).trim());
        this.resetInactivityTimeout(callback);
      });
    };

    this.recognition.onerror = (event: any) => {
      if (event.error !== "no-speech") {
        console.error("Web recognition error:", event.error);
      }
    };

    this.recognition.onend = () => {
      clearTimeout(this.timeout);
      if (!this.stoppedManually) {
        this.zone.run(() => callback(this.finalTranscript.trim()));
      }
    };

    this.recognition.start();
  }

  private async stopWebRecognition() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  private resetInactivityTimeout(callback: (text: string) => void) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (!this.stoppedManually) {
        this.stopRecognition();
      }
    }, this.INACTIVITY_TIMEOUT_MS);
  }

  private async triggerHaptic(style: ImpactStyle) {
    if (this.isNative) {
      try {
        await Haptics.impact({ style });
      } catch (e) {}
    }
  }
}

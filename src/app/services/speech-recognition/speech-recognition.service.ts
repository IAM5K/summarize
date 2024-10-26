import { Injectable } from "@angular/core";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { Platform } from "@ionic/angular";
import { SpeechRecognitionEvent } from "src/app/models/interface/speechRecognition.interface";

// Declare webkitSpeechRecognition for web browsers
declare var webkitSpeechRecognition: any; // Declare the global var for webkitSpeechRecognition

@Injectable({
  providedIn: "root",
})
export class SpeechRecognitionService {
  private recognition: any; // Web Speech API recognition object
  private timeout: any; // Timeout for long pauses
  public textInput: string = "";
  stoppedManually = false;
  private readonly PAUSE_TIMEOUT_MS = 3000; // Adjust timeout duration as needed

  constructor(private platform: Platform) {}

  // Start speech recognition based on platform
  async startRecognition(callback: (text: string) => void) {
    if (this.platform.is("capacitor")) {
      await this.startNativeRecognition(callback);
    } else {
      await this.startWebRecognition(callback);
    }
  }

  // Stop speech recognition based on platform
  async stopRecognition() {
    if (this.platform.is("capacitor")) {
      await this.stopNativeRecognition();
    } else {
      await this.stopWebRecognition();
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

      // Check for permissions and request them if necessary
      const permissionStatus = await SpeechRecognition.checkPermissions();
      if (permissionStatus.speechRecognition !== "granted") {
        const requestResult = await SpeechRecognition.requestPermissions();
        if (requestResult.speechRecognition !== "granted") {
          alert("Permission not granted for speech recognition.");
          return;
        }
      }

      await SpeechRecognition.start({
        language: "en-US",
        partialResults: true,
        popup: false,
      });

      // Listen for partial results
      SpeechRecognition.addListener("partialResults", (data: { matches: string[] }) => {
        if (data.matches && data.matches.length > 0) {
          this.updateTextInput(data.matches.join(" "), callback);
        }
      });

      // Start a timeout for long pauses
      this.resetPauseTimeout(callback);
    } catch (error) {
      console.error("Error starting native speech recognition:", error);
    }
  }

  // Stop native speech recognition
  private async stopNativeRecognition() {
    try {
      await SpeechRecognition.stop();
      SpeechRecognition.removeAllListeners();
      clearTimeout(this.timeout); // Clear the pause timeout
    } catch (error) {
      console.error("Error stopping native speech recognition:", error);
    }
  }

  // Start web speech recognition
  private async startWebRecognition(callback: (text: string) => void) {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Speech recognition not supported in this browser.");
      alert("Speech recognition not supported in this browser.");
      return;
    }

    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-US";

    // Log when speech recognition starts
    this.recognition.onstart = () => {
      console.log("Speech recognition started.");
      this.resetPauseTimeout(callback); // Start timeout for long pauses
    };

    // Handle the recognition result (partial and final)
    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      let interimTranscript = "";

      console.log("Speech recognition event triggered:", event);

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
          console.log(`Final transcript: ${event.results[i][0].transcript}`);
        } else {
          interimTranscript += event.results[i][0].transcript + " ";
          console.log(`Interim transcript: ${event.results[i][0].transcript}`);
        }
      }

      // Append the final or interim transcript
      this.updateTextInput(finalTranscript || interimTranscript, callback);

      // Log and reset the pause timeout each time recognition results are received
      console.log("Resetting pause timeout due to speech activity.");
      this.resetPauseTimeout(callback);
    };

    // Handle errors and log them
    this.recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);

      // If the error is 'no-speech', handle it gracefully
      if (event.error === "no-speech") {
        console.log("No speech detected. Waiting for input...");
      } else {
        alert(`Error occurred in speech recognition: ${event.error}`);
      }
    };

    // Handle when recognition ends (auto stops or manually stopped)
    this.recognition.onend = () => {
      console.log("Speech recognition ended.");
      clearTimeout(this.timeout); // Clear the pause timeout

      // Check if it ended due to inactivity (which triggers onerror first)
      if (!this.stoppedManually) {
        alert("Listening stopped due to inactivity.");
      }
    };

    // Log starting the recognition process and begin listening
    console.log("Starting speech recognition...");
    this.stoppedManually = false;
    this.recognition.start();
  }

  // Update the text input area with transcripts
  private updateTextInput(transcript: string, callback: (text: string) => void) {
    this.textInput += transcript;
    callback(this.textInput.trim());
  }

  // Reset the timeout that detects long pauses in speech recognition
  private resetPauseTimeout(callback: (text: string) => void) {
    clearTimeout(this.timeout);

    // Set timeout for 10 seconds of inactivity
    this.timeout = setTimeout(() => {
      console.log("Timeout due to inactivity.");
      this.stopWebRecognition(); // Stop recognition due to inactivity
      alert("Listening stopped due to inactivity.");
      callback(this.textInput.trim());
    }, 10000); // Adjust this value as needed (10 seconds)
  }

  // Stop web speech recognition manually
  private stopWebRecognition() {
    if (this.recognition) {
      this.stoppedManually = true;
      this.recognition.stop();
    }
  }

  // // Stop web speech recognition
  // private stopWebRecognition() {
  //   if (this.recognition) {
  //     this.recognition.stop();
  //   }
  // }

  // // Update text input and call the callback
  // private updateTextInput(transcript: string, callback: (text: string) => void) {
  //   this.textInput += transcript;
  //   callback(this.textInput.trim());
  // }

  // // Reset the timeout for long pauses
  // private resetPauseTimeout(callback: (text: string) => void) {
  //   clearTimeout(this.timeout);
  //   this.timeout = setTimeout(() => {
  //     this.stopRecognition();
  //     callback(this.textInput.trim()); // Optionally send final input after stopping
  //     alert("Listening stopped due to inactivity.");
  //   }, this.PAUSE_TIMEOUT_MS);
  // }
}

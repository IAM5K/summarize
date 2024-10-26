export interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    isFinal: boolean;
    [index: number]: {
      transcript: string;
    };
  }[];
}

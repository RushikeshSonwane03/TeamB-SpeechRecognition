
import { onMount } from "svelte";

var languages = [
  { code: "en-US", name: "English (US)" },
  { code: "hi-IN", name: "Hindi" },
  { code: "mr-IN", name: "Marathi" },
  { code: "te-IN", name: "Telugu" },
  { code: "ta-IN", name: "Tamil" },
  { code: "bn-IN", name: "Bengali" },
  { code: "gu-IN", name: "Gujarati" },
  { code: "kn-IN", name: "Kannada" },
  { code: "ur-IN", name: "Urdu" },
];

let selectedLanguage = "en-US"; // Default language

let text = "";
let recognition;

const startRecognition = () => {
  recognition.lang = selectedLanguage;
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        text += transcript + " "; // Append final result to text
      } else {
        interimTranscript += transcript;
      }
    }
  };

  recognition.onerror = (event) => {
    stopRecording();
    if (event.error === "no-speech") {
      alert("No speech was detected. Stopping...");
    } else if (event.error === "audio-capture") {
      alert(
        "No microphone was found. Ensure that a microphone is installed."
      );
    } else if (event.error === "not-allowed") {
      alert("Permission to use microphone is blocked.");
    } else if (event.error === "aborted") {
      alert("Listening Stopped.");
    } else {
      alert("Error occurred in recognition: " + event.error);
    }
  };
} catch (error) {
  recording = false;

  console.log(error);
}

 
};

const load = () => {
  recognition = new webkitSpeechRecognition();
  recording = false;

  recognition.onend = () => {};
};

const stopRecognition = () => {
    recognition.stop();
    recording = false;
};

onMount(load);
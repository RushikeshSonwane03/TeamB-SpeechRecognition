<script>
	import {languages} from "./languages";
  

	let recognition;
	let recording = false;
  
	let interimText = "";
	let text = "";
  
	let selectedLanguage = "en";
  
	
  
	  

	function speechToText() {
  if (!recognition) {
    try {
      recognition = new webkitSpeechRecognition();
      recognition.lang = selectedLanguage;
      recognition.interimResults = true;
      recognition.start();

      recording = true;
    } catch (error) {
      recording = false;
      console.log(error);
    }


    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;

        if (event.results[0].isFinal) {
          text += " " + speechResult;
          interimText = "";
        } else {
          interimText = " " + speechResult;
        }
      
    };

    recognition.onend = () => {
		if (recognition!=null) {
			recognition.start();
      recording = true;	
		}
		
    };

    recognition.onerror = (event) => {
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
	  recording=false;
      stopRecording();
	  
    };
  }
}

	function restart() {
		stopRecording();
		speechToText();
		stopRecording();
		

	}


	function stopRecording() {
	  if (recognition) {
		recognition.stop();
		recognition = null;
		recording=false;
	  }
	}
  
	function download() {
	  const filename = "speech.txt";
	  const data = text;
  
	  const blob = new Blob([data], { type: "text/plain" });
	  const url = URL.createObjectURL(blob);
  
	  const a = document.createElement("a");
	  a.href = url;
	  a.download = filename;
	  a.style.display = "none";
	  document.body.appendChild(a);
	  a.click();
	  document.body.removeChild(a);
	}
  
	function clear() {
	  text = "";
	  interimText = "";
	}
  </script>
  
  <!-- Your Svelte component's HTML structure -->
  <div class="container">
	<p class="heading">Speech to Text</p>
	<div class="options">
	  <div class="language">
		<p>Language</p>
		<select bind:value={selectedLanguage} on:change={restart}>
		  {#each languages as lang}
			<option value={lang.code}>{lang.name}</option>
		  {/each}
		</select>
	  </div>
	</div>
	<div class="line"></div>
	<button class="btn record" on:click={recording ? stopRecording : speechToText}>
	  <div class="icon">
		<ion-icon name="mic-outline"></ion-icon>
	  </div>
	  <p>{recording ? "Stop Listening" : "Start Listening"}</p>
	</button>
	<p class="heading">Result :</p>
	<div class="result" spellcheck="false" placeholder="Text will be shown here">

		<textarea name="text" id="" cols="30" rows="10">{text+""+interimText}</textarea>
		
	  
	</div>
	<div class="buttons">
	  <button class="btn clear" on:click={clear}>
		<ion-icon name="trash-outline"></ion-icon>
		<p>Clear</p>
	  </button>
	  <button class="btn download" disabled={text === ""} on:click={download}>
		<ion-icon name="cloud-download-outline"></ion-icon>
		<p>Download</p>
	  </button>
	</div>
  </div>

  
  <style>
  /* Your CSS styles go here */
  </style>
  
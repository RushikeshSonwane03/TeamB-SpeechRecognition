<script>
	import { onMount } from 'svelte';


	let selectedVoice = 'Microsoft David - English (United States)';
	let voiceNames = [];
	let text = '';
	let rate = 1;
	let pitch = 1;
	let volume = 1;

	let showtext = 'Loading text...';

	const doVoices = () => {
		voiceNames = speechSynthesis.getVoices().map((voice) => voice.name);
	};

	onMount(doVoices);

	

	const speak = () => {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.pitch = pitch;
		utterance.volume = volume;
		utterance.rate = rate;
		utterance.voice = speechSynthesis.getVoices().find((voice) => voice.name === selectedVoice);
		const downloadLink = document.getElementById('download-link');
       
		if (!utterance.voice || !selectedVoice || !text) {
			alert('Invalid input. Please select a voice and enter text.');
			return;
		}

		window.speechSynthesis.speak(utterance);

	};

	const runSpeechRecog = () => {
		var action = document.getElementById('action');
		let recognization = new webkitSpeechRecognition();
		recognization.onstart = () => {
			action.innerHTML = 'Listening...';
			$: text = showtext;
		};

		recognization.onend = () => {
			console.log('hello world');
			if (text == 'Loading text...' && action.innerHTML == 'Listening...') {
				text = '';
				action.innerHTML = 'Not found';
			}
			
		};

		recognization.onresult = (e) => {
			var transcript = e.results[0][0].transcript;
			$: text = transcript;
			action.innerHTML = '';
			
		};

		recognization.start();
	};
</script>


<div class="box font-normal text-gray-700 dark:text-gray-400">
	<label for="selectedvoice" class="selectedvoice">Selected voice</label>
	<select
		bind:value={selectedVoice}
		class="voiceNames dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
	>
		{#each voiceNames as voiceName}
			<option value={voiceName}>{voiceName}</option>
		{/each}
	</select>
	<label for="pitchlabel" class="pitchlabel">select pitch</label>
	<input
		type="range"
		class="pitch"
		name="pitch"
		bind:value={pitch}
		min="0.1"
		max="2"
		step="0.1"
		id="pitch"
	/>

	<label for="ratelabel" class="ratelabel">select rate</label>
	<input
		type="range"
		class="rate"
		name="rate"
		bind:value={rate}
		min="0.1"
		max="2"
		step="0.1"
		id="pitch"
	/>

	<label for="volumelabel" class="volumelabel">select volume</label>
	<input
		type="range"
		name="volume"
		class="volume"
		bind:value={volume}
		min="0.1"
		max="1"
		step="0.1"
		id="volume"
	/>
	<button
		on:click={speak}
		class="buttonsp py-2.5 px-5 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
		>Text to Speech</button
	>
	<button
		on:click={runSpeechRecog}
		class="buttonsptotext py-2.5 px-5 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
		style="border: transparent;padding: 0 0.5rem;"
	>
		Speech to text
	</button>
	<p id="action" />
</div>

<div class="box1">
	<div class="p-5 mr-2 relative dark:text-white">
		<textarea
			bind:value={text}
			class="textarea dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
		/>
	</div>
</div>
<div class="clear" />

<style>
	/* Styling for the select element */
	.voiceNames {
		margin-top: 27px;
		width: 80%;
		float: left; /* Place the select on the left side */
		margin-left: 30px;
	}

	.buttonsp {
		margin-left: 30px;
	}

	/* Styling for the box containing text input and range inputs */
	.box1 {
		margin-top: 60px;
		float: right; /* Place the box on the right side */
		margin-right: 50px;
		width: 50%; /* Add some spacing from the right edge */
		padding: 20px;
	}

	/* Styling for the range inputs */
	.pitch,
	.rate,
	.volume {
		width: 100%;
		margin-left: 30px;
	}

	/* Styling for the button */
	button {
		 /* Change the button text color to white */
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
		margin-top: 20px;
		height: 45px;
		width: 150px;
	}
	.buttonsptotext {
		width: 150px;
		height: 45px;
		margin-left: 30px;
		 /* Change the button text color to white */
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
		margin-top: 20px;
	}

	.selectedvoice {
		margin-top: 30px;
	}

	/* Additional styling for labels if needed */
	.selectedvoice,
	.pitchlabel,
	.ratelabel,
	.volumelabel {
		display: block;
		margin-top: 20px;
		font-weight: bold;
		margin-left: 30px;
		font-size: 20px;
	}
	.pitchlabel {
		margin-top: 104px;
	}

	.copy {
		margin-top: 208px;
		/* margin-left: -56px; */
		margin-right: 75px;
	}

	/* Additional styling for the textarea if needed */
	.textarea {
		width: 100%;
		height: 300px;
		border-radius: 10px;
		margin-top: 30px;
		font-size: 30px;
	}

	/* Additional styling for the box containing the select element */
	.box {
		width: 30%;
		float: left;
		margin-top: 60px;
	}

	/* Clear the float to ensure proper layout */
	.clear {
		clear: both;
	}

	p {
		font-size: 43px;
		margin-left: 37px;
		height: 50px;
	}
</style>

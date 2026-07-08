<script>
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';
</script>

<input
	type="range"
	min="0"
	max="100"
	bind:value={youtubePlayer.volume}
	oninput={() => {
		youtubePlayer.setVolume(youtubePlayer.volume);
	}}
	class="range range-vertical"
/>
<p>Volume: {youtubePlayer.volume}</p>

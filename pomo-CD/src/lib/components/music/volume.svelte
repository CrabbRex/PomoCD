<script>
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';
</script>

<div class="flex flex-col items-center gap-3">
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
</div>

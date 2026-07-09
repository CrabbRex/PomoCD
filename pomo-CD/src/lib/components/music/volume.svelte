<script>
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';
</script>

<div class="flex flex-col items-center gap-3">
	<span class="text-xl">🔊</span>
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
	<span class="text-xl">🔈</span>
</div>

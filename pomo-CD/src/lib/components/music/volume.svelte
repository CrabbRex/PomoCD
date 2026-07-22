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
		class="range range-vertical range-sm sm:range-md lg:range-lg h-36 sm:h-44 md:h-48 lg:h-64 xl:h-72"
	/>
</div>

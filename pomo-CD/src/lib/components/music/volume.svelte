<script>
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';
</script>

<div class="flex flex-col items-center gap-3">
	<div
		class="rounded-full p-2 backdrop-blur-md
		bg-linear-to-b from-(--material-panel-to) to-(--material-seam)
		shadow-[inset_0_2px_5px_rgba(43,42,40,0.35),inset_0_-1px_0_rgba(255,255,255,0.6)]"
	>
		<input
			type="range"
			min="0"
			max="100"
			bind:value={youtubePlayer.volume}
			oninput={() => {
				youtubePlayer.setVolume(youtubePlayer.volume);
			}}
			class="range range-vertical range-sm sm:range-md lg:range-lg h-36 sm:h-44 md:h-[clamp(12rem,calc(18.75vw_+_3rem),18rem)]
			[&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-(--material-rim-via)
			[&::-webkit-slider-thumb]:bg-linear-to-b [&::-webkit-slider-thumb]:from-(--material-panel-from)
			[&::-webkit-slider-thumb]:via-(--material-seam) [&::-webkit-slider-thumb]:to-(--material-rim-via)
			[&::-webkit-slider-thumb]:shadow-[0_2px_3px_rgba(43,42,40,0.35)]
			[&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-(--material-rim-via)
			[&::-moz-range-thumb]:bg-linear-to-b [&::-moz-range-thumb]:from-(--material-panel-from)
			[&::-moz-range-thumb]:via-(--material-seam) [&::-moz-range-thumb]:to-(--material-rim-via)"
		/>
	</div>
</div>

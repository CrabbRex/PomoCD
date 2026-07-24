<script>
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';
</script>

<div class="flex flex-col items-center gap-3">
	<div
		class="rounded-full p-2
		bg-linear-to-b from-[#e3e1da] to-[#c7c5be]
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
			class="range range-vertical range-sm sm:range-md lg:range-lg h-36 sm:h-44 md:h-48 lg:h-64 xl:h-72
			[&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-[#8a8d91]
			[&::-webkit-slider-thumb]:bg-linear-to-b [&::-webkit-slider-thumb]:from-[#fafaf8]
			[&::-webkit-slider-thumb]:via-[#c7c5be] [&::-webkit-slider-thumb]:to-[#8a8d91]
			[&::-webkit-slider-thumb]:shadow-[0_2px_3px_rgba(43,42,40,0.35)]
			[&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-[#8a8d91]
			[&::-moz-range-thumb]:bg-linear-to-b [&::-moz-range-thumb]:from-[#fafaf8]
			[&::-moz-range-thumb]:via-[#c7c5be] [&::-moz-range-thumb]:to-[#8a8d91]"
		/>
	</div>
</div>

<script lang="ts">
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';

	let { isCompact = false }: { isCompact?: boolean } = $props();
</script>

<div class="flex flex-col items-center gap-3">
	<div
		class="rounded-full p-2 backdrop-blur-md flex items-center justify-center
		bg-linear-to-b from-(--well-from) to-(--well-to)
		shadow-[inset_0_2px_3px_rgb(0_0_0/0.34),0_1px_0_var(--cap-spec)]"
	>
		<input
			type="range"
			min="0"
			max="100"
			value={youtubePlayer.volume}
			oninput={(e) => youtubePlayer.setVolume(Number(e.currentTarget.value))}
			class="range range-sm sm:range-md lg:range-lg
			{isCompact
				? 'md:w-[var(--compact-control-size)]'
				: 'range-vertical h-36 sm:h-44 md:h-[clamp(10rem,42cqh,18rem)]'}
			[&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-(--cap-edge)
			[&::-webkit-slider-thumb]:bg-linear-to-b [&::-webkit-slider-thumb]:from-(--cap-from)
			[&::-webkit-slider-thumb]:via-(--cap-mid) [&::-webkit-slider-thumb]:to-(--cap-to)
			[&::-webkit-slider-thumb]:shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_1px_0_var(--cap-wall-1),0_2px_0_var(--cap-wall-2),0_3px_3px_var(--cap-drop)]
			[&::-webkit-slider-thumb]:transition-[background,box-shadow] [&::-webkit-slider-thumb]:duration-200
			[&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-(--cap-edge)
			[&::-moz-range-thumb]:bg-linear-to-b [&::-moz-range-thumb]:from-(--cap-from)
			[&::-moz-range-thumb]:via-(--cap-mid) [&::-moz-range-thumb]:to-(--cap-to)
			[&::-moz-range-thumb]:shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_1px_0_var(--cap-wall-1),0_2px_0_var(--cap-wall-2),0_3px_3px_var(--cap-drop)]
			[&::-moz-range-thumb]:transition-[background,box-shadow] [&::-moz-range-thumb]:duration-200"
		/>
	</div>
</div>

<script>
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';
</script>

<div class="flex items-center gap-4 w-full">
	<div
		class="shrink-0 rounded-xl p-1.5 sm:p-2
		bg-linear-to-br from-[#dad7cf] via-[#8a8d91] to-[#6a6d71]
		shadow-[inset_0_3px_6px_rgba(43,42,40,0.4),inset_0_-1px_2px_rgba(255,255,255,0.5),0_4px_10px_rgba(43,42,40,0.15)]"
	>
		<div
			class="rounded-lg overflow-hidden bg-black pointer-events-none"
			style="width:200px;height:200px;"
		>
			<div id="player"></div>
		</div>
	</div>
	<div class="flex-1 min-w-0">
		<div
			class="rounded-lg border border-[#0c0d0a] bg-[#1c1f1a] px-4 py-3
			shadow-[inset_0_2px_6px_rgba(0,0,0,0.6),inset_0_-1px_0_rgba(255,255,255,0.05)]"
		>
			<span class="font-digital text-xs sm:text-sm tracking-widest text-[#9fdb8a]/70">
				NOW PLAYING
			</span>
			<div class="mt-1 overflow-hidden @container">
				<span
					class="font-digital block w-max text-lg sm:text-xl text-[#9fdb8a] animate-marquee
					[text-shadow:0_0_6px_rgba(159,219,138,0.6)]"
				>
					{youtubePlayer.title ?? 'Nothing playing'}
				</span>
			</div>
		</div>
	</div>
</div>

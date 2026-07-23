<script>
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';
</script>

<div class="flex items-center gap-3 w-full">
	<div class="flex-1 flex flex-col gap-2 min-w-0 m-10">
		<div class="border-b border-primary pb-1">
			<span class="font-digital text-base sm:text-lg text-primary">Now Playing:</span>
		</div>
		<div class="border-b border-primary pb-1 overflow-hidden @container">
			<span class="font-digital block w-max text-lg sm:text-xl text-primary animate-marquee">
				{youtubePlayer.title ?? 'Nothing playing'}
			</span>
		</div>
	</div>
	<div
		class="shrink-0 rounded overflow-hidden pointer-events-none"
		style="width:200px;height:200px;"
	>
		<div id="player"></div>
	</div>
</div>

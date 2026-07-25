<script>
	import { timer } from '$lib/stores/timer.svelte';
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';
	import { albumArtStore } from '$lib/stores/albumArt.svelte';
	import CDDisc from './CDDisc.svelte';
	import CDTray from './CDTray.svelte';

	let displayThumbnail = $derived(albumArtStore.get(youtubePlayer.currentPlaylistId));
</script>

<div
	class="relative rounded-[2rem] p-5 sm:p-7
	aspect-square
	w-[min(85cqw,max(8rem,calc(100dvh-42rem)),22rem)]
	sm:w-[min(80cqw,max(8rem,calc(100dvh-43rem)),27rem)]
	max-md:landscape:w-[min(60cqw,max(8rem,calc(100dvh-23rem)),26rem)]!
	md:h-[min(100cqh,100cqw,var(--cd-max-size))]
	md:w-[min(100cqh,100cqw,var(--cd-max-size))]
	backdrop-blur-md
	bg-linear-to-b from-(--material-panel-from) to-(--material-panel-to)
	shadow-[0_20px_40px_rgba(43,42,40,0.22),0_8px_16px_rgba(43,42,40,0.14),0_2px_4px_rgba(43,42,40,0.12),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(43,42,40,0.15)]
	border border-(--material-seam)"
>
	<!-- hinge clips -->
	<div
		class="absolute top-0 left-8 sm:left-10 h-3 w-8 sm:h-4 sm:w-10 rounded-b-md
		bg-linear-to-b from-(--material-panel-from) via-(--material-seam) to-(--material-rim-via)
		shadow-[0_2px_3px_rgba(43,42,40,0.25)] border border-(--material-rim-via)"
	></div>
	<div
		class="absolute top-0 right-8 sm:right-10 h-3 w-8 sm:h-4 sm:w-10 rounded-b-md
		bg-linear-to-b from-(--material-panel-from) via-(--material-seam) to-(--material-rim-via)
		shadow-[0_2px_3px_rgba(43,42,40,0.25)] border border-(--material-rim-via)"
	></div>

	<!-- chrome rim / recessed pocket -->
	<div
		class="relative h-full w-full rounded-full p-1.5 sm:p-2 backdrop-blur-md
		bg-linear-to-br from-(--material-rim-from) via-(--material-rim-via) to-(--material-rim-to)
		shadow-[inset_0_8px_18px_rgba(43,42,40,0.5),inset_0_2px_4px_rgba(43,42,40,0.35),inset_0_-2px_4px_rgba(255,255,255,0.55),inset_0_0_0_1px_rgba(255,255,255,0.15)]"
	>
		<CDTray />
		<CDDisc spinning={timer.isRunning} thumbnail={displayThumbnail} />
	</div>
</div>

<script>
	import { timer } from '$lib/stores/timer.svelte';
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';
	import { albumArtStore } from '$lib/stores/albumArt.svelte';
	import { fade } from 'svelte/transition';

	let displayThumbnail = $derived(
		albumArtStore.get(youtubePlayer.currentPlaylistId) ?? youtubePlayer.thumbnail
	);
</script>

<div
	class="
		aspect-square
		w-[min(70vh,70vw)]
		max-w-full
		max-h-full
		relative
		"
>
	<div
		class="absolute inset-0 rounded-full animate-cd-spin
		bg-linear-to-br from-zinc-100 via-zinc-400 to-zinc-900
		shadow-2xl border border-zinc-700"
		style:animation-play-state={timer.isRunning ? 'running' : 'paused'}
	>
		<div
			class="absolute inset-3 rounded-full overflow-hidden bg-linear-to-br from-zinc-200 via-zinc-500 to-zinc-800 shadow-inner"
		>
			{#key displayThumbnail}
				<div class="absolute inset-0" transition:fade={{ duration: 400 }}>
					{#if displayThumbnail}
						<img src={displayThumbnail} alt="" class="h-full w-full object-cover" />
					{:else}
						<div class="h-full w-full bg-linear-to-br from-zinc-200 via-zinc-500 to-zinc-800"></div>
					{/if}
				</div>
			{/key}
		</div>

		<div
			class="absolute inset-0 rounded-full opacity-25
			bg-[conic-gradient(from_0deg,transparent,rgba(255,0,120,0.25),rgba(0,255,255,0.2),rgba(0,255,100,0.2),rgba(255,255,0,0.2),transparent)]"
		></div>
		<div
			class="absolute inset-4 rounded-full opacity-30
			bg-[repeating-radial-gradient(circle,transparent_0px,transparent_3px,rgba(255,255,255,0.05)_4px)]"
		></div>
		<div
			class="absolute top-1/2 left-1/2 h-10 w-10
			-translate-x-1/2 -translate-y-1/2
			rounded-full shadow-inner z-20"
		></div>
	</div>
	<div
		class="pointer-events-none absolute inset-0 rounded-full
		bg-[linear-gradient(30deg,transparent_35%,rgba(255,255,255,0.22)_48%,rgba(255,255,255,0.45)_50%,rgba(255,255,255,0.22)_52%,transparent_65%)]"
	></div>

	<div class="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/10"></div>
</div>
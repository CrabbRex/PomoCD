<script>
	import { timer } from '$lib/stores/timer.svelte';
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';
	import { albumArtStore } from '$lib/stores/albumArt.svelte';
	import { fade } from 'svelte/transition';

	let displayThumbnail = $derived(albumArtStore.get(youtubePlayer.currentPlaylistId));
</script>

<div
	class="relative rounded-[2rem] p-5 sm:p-7
	aspect-square
	w-[min(85vw,max(8rem,calc(100dvh-30rem)),22rem)]
	sm:w-[min(80vw,max(8rem,calc(100dvh-32rem)),27rem)]
	max-md:landscape:w-[min(60vw,max(8rem,calc(100dvh-14rem)),26rem)]!
	md:w-[min(58vw,max(10rem,calc(100dvh-16rem)),30rem)]
	lg:w-[min(52vw,max(10rem,calc(100dvh-16rem)),36rem)]
	xl:w-[min(46vw,max(10rem,calc(100dvh-16rem)),42rem)]
	2xl:w-[min(42vw,max(10rem,calc(100dvh-16rem)),46rem)]
	bg-linear-to-b from-[#fafaf8] to-[#e3e1da]
	shadow-[0_12px_28px_rgba(43,42,40,0.18),0_2px_6px_rgba(43,42,40,0.1)]
	border border-[#c7c5be]"
>
	<!-- hinge clips -->
	<div
		class="absolute top-0 left-8 sm:left-10 h-3 w-8 sm:h-4 sm:w-10 rounded-b-md
		bg-linear-to-b from-[#fafaf8] via-[#c7c5be] to-[#8a8d91]
		shadow-[0_2px_3px_rgba(43,42,40,0.25)] border border-[#8a8d91]"
	></div>
	<div
		class="absolute top-0 right-8 sm:right-10 h-3 w-8 sm:h-4 sm:w-10 rounded-b-md
		bg-linear-to-b from-[#fafaf8] via-[#c7c5be] to-[#8a8d91]
		shadow-[0_2px_3px_rgba(43,42,40,0.25)] border border-[#8a8d91]"
	></div>

	<!-- chrome rim / recessed pocket -->
	<div
		class="relative h-full w-full rounded-full p-1.5 sm:p-2
		bg-linear-to-br from-[#dad7cf] via-[#8a8d91] to-[#6a6d71]
		shadow-[inset_0_6px_14px_rgba(43,42,40,0.45),inset_0_-2px_4px_rgba(255,255,255,0.5)]"
	>
		<div class="relative h-full w-full">
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
								<div
									class="h-full w-full bg-linear-to-br from-zinc-200 via-zinc-500 to-zinc-800"
								></div>
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
	</div>
</div>

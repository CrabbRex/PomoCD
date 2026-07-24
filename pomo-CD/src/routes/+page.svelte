<script>
	import Timer from '$lib/components/timer/Timer.svelte';
	import MusicControls from '$lib/components/music/MusicControls.svelte';
	import TimerControl from '$lib/components/timer/TimerControl.svelte';
	import TimerDisplay from '$lib/components/timer/TimerDisplay.svelte';
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';
	import { albumArtStore } from '$lib/stores/albumArt.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();

	albumArtStore.hydrate(data.albumArt);

	onMount(() => {
		youtubePlayer.init();
	});
</script>

<main class="h-dvh overflow-hidden flex flex-col bg-base-100" data-theme="discplayer">
	<header class="h-16 shrink-0 flex items-center justify-center px-24 sm:px-0">
		<h1
			class="font-brand text-lg sm:text-2xl font-semibold uppercase tracking-[0.25em]
			text-base-content/80 truncate"
		>
			PomoCD
		</h1>
	</header>
	<div
		class="flex-1 flex flex-col items-center justify-center gap-3 overflow-y-auto py-2
		px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
	>
		<div
			class="w-full flex flex-col max-md:landscape:flex-row md:flex-row items-center max-md:landscape:items-stretch md:items-stretch gap-8 max-md:landscape:gap-0 md:gap-0"
		>
			<div
				class="order-2 max-md:landscape:order-1 md:order-1 w-full max-md:landscape:basis-1/3 md:basis-1/3 flex justify-center items-center max-md:landscape:items-start md:items-stretch max-md:landscape:overflow-y-auto shrink-0"
			>
				<div class="relative w-full max-w-lg mx-auto">
					<div
						class="relative flex flex-col items-center justify-center gap-6
						rounded-[2rem] p-6 sm:p-8 md:h-full
						bg-linear-to-b from-[#fafaf8] to-[#e3e1da]
						border border-[#c7c5be]
						shadow-[0_12px_28px_rgba(43,42,40,0.18),0_2px_6px_rgba(43,42,40,0.1)]"
					>
						<!-- hinge clip -->
						<div
							class="absolute top-0 left-8 sm:left-10 h-3 w-8 sm:h-4 sm:w-10 rounded-b-md
							bg-linear-to-b from-[#fafaf8] via-[#c7c5be] to-[#8a8d91]
							shadow-[0_2px_3px_rgba(43,42,40,0.25)] border border-[#8a8d91]"
						></div>

						<MusicControls />
					</div>
				</div>
			</div>
			<div
				class="order-1 max-md:landscape:order-2 md:order-2 w-full max-md:landscape:basis-2/3 md:basis-2/3 flex justify-center items-center md:items-stretch md:[container-type:size] min-w-0"
			>
				<Timer />
			</div>
		</div>
		<div class="shrink-0 flex items-center justify-center gap-3">
			<TimerDisplay />
			<TimerControl />
		</div>
	</div>
</main>

<script>
	import Timer from '$lib/components/timer/Timer.svelte';
	import MusicControls from '$lib/components/music/MusicControls.svelte';
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';
	import { albumArtStore } from '$lib/stores/albumArt.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();

	albumArtStore.hydrate(data.albumArt);

	onMount(() => {
		youtubePlayer.init();
	});
</script>

<main class="h-dvh overflow-hidden flex flex-col" data-theme="luxury">
	<header class="h-16 shrink-0 flex items-center justify-center px-24 sm:px-0">
		<h1 class="text-xl sm:text-3xl font-bold truncate">PomoCD</h1>
	</header>
	<div
		class="flex-1 flex flex-col max-md:landscape:flex-row md:flex-row items-center max-md:landscape:items-stretch md:items-stretch gap-8 max-md:landscape:gap-0 md:gap-0 py-6 max-md:landscape:py-0 md:py-0 overflow-hidden"
	>
		<div
			class="order-2 max-md:landscape:order-1 md:order-1 w-full max-md:landscape:basis-1/3 md:basis-1/3 flex justify-center items-center shrink-0"
		>
			<MusicControls />
		</div>
		<div
			class="order-1 max-md:landscape:order-2 md:order-2 w-full max-md:landscape:basis-2/3 md:basis-2/3 flex justify-center items-center min-w-0"
		>
			<Timer />
		</div>
		<div id="player" style="width:0;height:0;"></div>
	</div>
</main>

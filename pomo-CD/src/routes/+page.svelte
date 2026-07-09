<script>
	import Timer from '$lib/components/timer/Timer.svelte';
	import MusicControls from '$lib/components/music/MusicControls.svelte';
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		youtubePlayer.init();
	});
</script>

<main
	class="
		h-screen
		overflow-hidden
		flex
		flex-col
		bg-base-100
		"
	data-theme="luxury"
>
	<header class="h-16 shrink-0 flex items-center justify-center">
		<h1 class="text-3xl font-bold">PomoCD</h1>
	</header>
	<div class="flex-1 flex overflow-hidden">
		<div class="basis-1/3 flex justify-center items-center">
			<MusicControls />
		</div>
		<div class="basis-2/3 flex justify-center items-center">
			<Timer />
		</div>
		<div id="player" style="width:0;height:0;"></div>
	</div>

	<!-- <div class="top-4 right-4 fixed">
		<button class="btn">here</button>
	</div> -->
</main>

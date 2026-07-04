<script>
	import Timer from '$lib/components/timer/Timer.svelte';
    import { initYouTubePlayer } from '$lib/services/youtubePlayer';
    import { onMount } from 'svelte';

    onMount(() => {
        initYouTubePlayer();
    });
</script>

<main class="min-h-screen flex flex-col justify-center" data-theme="luxury">
	<header class="flex justify-center py-6">
		<h1 class="text-3xl font-bold">PomoCD</h1>
	</header>
	<div class="flex flex-1 items-center justify-center">
		<Timer />
	</div>
    <div id="player" style="width:0;height:0;"></div>
	<!-- <div class="top-4 right-4 fixed">
		<button class="btn">here</button>
	</div> -->
</main>

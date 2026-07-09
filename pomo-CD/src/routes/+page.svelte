<script>
	import Timer from '$lib/components/timer/Timer.svelte';
	import MusicControls from '$lib/components/music/MusicControls.svelte';
    import { youtubePlayer  } from '$lib/services/youtubePlayer.svelte';
    import { onMount } from 'svelte';

	

    onMount(() => {
        youtubePlayer.init();
    });
</script>

<main class="min-h-screen flex flex-col justify-center" data-theme="luxury">
	<header class="flex justify-center py-6">
		<h1 class="text-3xl font-bold">PomoCD</h1>
	</header>
	<div class="grid grid-cols-3 grid-rows-1 gap-4">
		<div class="flex flex-col items-center justify-center">
			<MusicControls />
		</div>
		<div class="flex flex-1 items-center justify-center col-span-2">
			<Timer />
		</div>
		<div id="player" style="width:0;height:0;"></div>
	</div>
	
    
	<!-- <div class="top-4 right-4 fixed">
		<button class="btn">here</button>
	</div> -->
	
</main>

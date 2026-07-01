<script lang="ts">
	import { onDestroy } from 'svelte';

	let totalSeconds = 2 * 60;
	let secondsLeft = $state(totalSeconds);

	let rotation = $state(0);

	let running = $state(false);

	setInterval(() => {
		if (running) {
			rotation = (rotation + 1) % 360;
		}
	}, 1000 / 60);

	let interval: ReturnType<typeof setInterval> | null = null;

	function startTimer() {
		if (interval) return; // Timer is already running

		running = true;

		interval = setInterval(() => {
			if (secondsLeft > 0) {
				secondsLeft -= 1;
			} else {
				stop();
			}
		}, 1000);
	}

	function stop() {
		running = false;
		if (interval) {
			clearInterval(interval);
		}
		interval = null;
	}

	function reset() {
		stop();
		secondsLeft = totalSeconds;
	}

	function formatTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	onDestroy(() => {
		stop();
	});
</script>

<div class="flex flex-col items-center gap-6">
	<!-- CD -->
	<div
		class="h-72 w-72 rounded-full bg-linear-to-br from-zinc-200 via-zinc-500 to-zinc-900 shadow-2xl animate-cd-spin"
	    style:animation-play-state={running ? 'running' : 'paused'}
	></div>
    <div class="hover-3d">
        <h1 class="text-3xl font-bold text-white">{formatTime(secondsLeft)}</h1>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    

	<div class="flex flex-row items-center gap-4">
		<button onclick={startTimer} class="btn">Start</button>
		<button onclick={stop} class="btn">Stop</button>
		<button onclick={reset} class="btn">Reset</button>
	</div>
</div>

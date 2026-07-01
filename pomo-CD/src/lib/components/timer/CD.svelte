<script>
	import { timer } from '$lib/stores/timer.svelte';
</script>

<div
	class="h-150 w-150 rounded-full bg-linear-to-br from-zinc-200 via-zinc-500 to-zinc-900 shadow-2xl animate-cd-spin"
	style:animation-play-state={timer.isRunning ? 'running' : 'paused'}
></div>

<script lang="ts">
	import { onDestroy } from 'svelte';

	import { timer } from '$lib/stores/timer.svelte';
	import TimerControl from '$lib/components/timer/TimerControl.svelte';
	import TimerDisplay from '$lib/components/timer/TimerDisplay.svelte';
	import CD from '$lib/components/timer/CD.svelte';
	

	onDestroy(() => {
		timer.pause();
	});
</script>

<div class="flex flex-col items-center gap-6">
	<CD />
	<TimerDisplay />
	<TimerControl />
</div>

<script lang="ts">
	import { onDestroy } from 'svelte';

	import { timer } from '$lib/stores/timer.svelte';
	import CD from '$lib/components/timer/CD.svelte';
	

	onDestroy(() => {
		timer.pause();
	});
</script>

<div class="flex flex-col items-center justify-center gap-6">
	<CD />
</div>

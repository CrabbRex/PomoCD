<script>
	import { timer } from '$lib/stores/timer.svelte';
</script>

<div class="flex flex-row items-center gap-4">
	<button class="btn" onclick={() => timer.start()}>
		Start
	</button>
	<button class="btn" onclick={() => timer.stop()}>
		Stop
	</button>
	<button class="btn" onclick={() => timer.reset()}>
		Reset
	</button>
</div>

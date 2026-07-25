<script>
	import { timer } from '$lib/stores/timer.svelte';

	let completedCount = $derived(
		timer.mode === 'work' ? timer.currentSessionNumber - 1 : timer.currentSessionNumber
	);
</script>

<div
	class="flex items-center gap-1.5"
	aria-label={`Session ${timer.currentSessionNumber} of ${timer.sessionsUntilLongBreak}`}
>
	{#each Array(timer.sessionsUntilLongBreak) as _, i}
		{@const n = i + 1}
		{@const isActive = timer.mode === 'work' && n === timer.currentSessionNumber}
		{@const isDone = n <= completedCount}
		<span
			class="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-colors duration-300
			{isActive
				? 'bg-[#9fdb8a] shadow-[0_0_5px_rgba(159,219,138,0.9)]'
				: isDone
					? 'bg-[#6f9a63]'
					: 'bg-[#3a3d35]'}"
		></span>
	{/each}
</div>

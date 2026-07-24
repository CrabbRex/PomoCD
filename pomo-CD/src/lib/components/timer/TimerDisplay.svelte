<script>
	import { timer } from '$lib/stores/timer.svelte';
	import { formatTime } from '$lib/utils/time';
</script>

<div class="flex flex-col items-center gap-2">
	<span class="text-sm uppercase tracking-widest text-base-content/70">{timer.phaseLabel}</span>
	<div
		class="rounded-lg border border-[#0c0d0a] bg-[#1c1f1a] px-6 py-1
		shadow-[inset_0_2px_6px_rgba(0,0,0,0.6),inset_0_-1px_0_rgba(255,255,255,0.05)]"
	>
		<h1
			class="font-digital text-5xl sm:text-6xl tracking-wider text-[#9fdb8a]
			[text-shadow:0_0_6px_rgba(159,219,138,0.6)]"
		>
			{formatTime(timer.secondsLeft)}
		</h1>
	</div>
</div>


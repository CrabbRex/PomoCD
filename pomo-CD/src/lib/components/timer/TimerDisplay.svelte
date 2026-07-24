<script>
	import { timer } from '$lib/stores/timer.svelte';
	import { formatTime } from '$lib/utils/time';
	import SessionDots from '$lib/components/timer/SessionDots.svelte';
</script>

<div class="flex flex-col items-center gap-1">
	<span class="text-xs uppercase tracking-widest text-base-content/70">{timer.phaseLabel}</span>
	<div
		class="rounded-lg border border-[#0c0d0a] bg-[#1c1f1a] px-4 py-0.5
		shadow-[inset_0_2px_6px_rgba(0,0,0,0.6),inset_0_-1px_0_rgba(255,255,255,0.05)]"
	>
		<h1
			class="font-digital text-2xl sm:text-3xl tracking-wider text-[#9fdb8a]
			[text-shadow:0_0_6px_rgba(159,219,138,0.6)]"
		>
			{formatTime(timer.secondsLeft)}
		</h1>
	</div>
	<SessionDots />
</div>


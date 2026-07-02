<script>
	import { timer } from '$lib/stores/timer.svelte';
	import { currentThumbnail } from '$lib/stores/music';
</script>


{#if $currentThumbnail}
	<img
		src={$currentThumbnail}
		alt="Current song"
		class="w-48 h-48 object-cover rounded-lg"
	/>
{:else}
	<div class="relative h-150 w-150">
		<div
			class="absolute inset-0 rounded-full animate-cd-spin
			bg-gradient-to-br from-zinc-100 via-zinc-400 to-zinc-900
			shadow-2xl border border-zinc-700"
			style:animation-play-state={timer.isRunning ? 'running' : 'paused'}
		>
			<div
				class="absolute inset-3 rounded-full
				bg-gradient-to-br from-zinc-200 via-zinc-500 to-zinc-800 shadow-inner"
			></div>
			
			<div
				class="absolute inset-0 rounded-full opacity-25
				bg-[conic-gradient(from_0deg,transparent,rgba(255,0,120,0.25),rgba(0,255,255,0.2),rgba(0,255,100,0.2),rgba(255,255,0,0.2),transparent)]"
			></div>
			<div
				class="absolute inset-4 rounded-full opacity-30
				bg-[repeating-radial-gradient(circle,transparent_0px,transparent_3px,rgba(255,255,255,0.05)_4px)]"
			></div>
			<div
				class="absolute top-1/2 left-1/2 h-10 w-10
				-translate-x-1/2 -translate-y-1/2
				rounded-full bg-blue-400 shadow-inner"
			></div>
		</div>
		<div
			class="pointer-events-none absolute inset-0 rounded-full
			bg-[linear-gradient(30deg,transparent_35%,rgba(255,255,255,0.22)_48%,rgba(255,255,255,0.45)_50%,rgba(255,255,255,0.22)_52%,transparent_65%)]"
		></div>

		<div
			class="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/10"
		></div>
	</div>
{/if}


<script>
	import { fade } from 'svelte/transition';

	let { spinning, thumbnail } = $props();
</script>

<div class="relative h-full w-full">
	<div
		class="absolute inset-0 rounded-full animate-cd-spin
		bg-linear-to-br from-zinc-100 via-zinc-400 to-zinc-900
		shadow-2xl border border-zinc-700"
		style:animation-play-state={spinning ? 'running' : 'paused'}
	>
		<div
			class="absolute inset-3 rounded-full overflow-hidden bg-linear-to-br from-zinc-200 via-zinc-500 to-zinc-800 shadow-inner"
		>
			{#key thumbnail}
				<div class="absolute inset-0" transition:fade={{ duration: 400 }}>
					{#if thumbnail}
						<img src={thumbnail} alt="" class="h-full w-full object-cover" />
					{:else}
						<div class="h-full w-full bg-linear-to-br from-zinc-200 via-zinc-500 to-zinc-800"></div>
					{/if}
				</div>
			{/key}
		</div>

		<div
			class="absolute inset-0 rounded-full opacity-25
			bg-[conic-gradient(from_0deg,transparent,rgba(255,0,120,0.25),rgba(0,255,255,0.2),rgba(0,255,100,0.2),rgba(255,255,0,0.2),transparent)]"
		></div>
		<div
			class="absolute inset-4 rounded-full opacity-30
			bg-[repeating-radial-gradient(circle,transparent_0px,transparent_3px,rgba(255,255,255,0.05)_4px)]"
		></div>
		<div
			class="absolute top-1/2 left-1/2 w-[18%] aspect-square
			-translate-x-1/2 -translate-y-1/2
			rounded-full z-20
			bg-linear-to-br from-zinc-50 via-zinc-300 to-zinc-500
			border border-zinc-600
			shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.4)]"
		>
			<div
				class="absolute top-1/2 left-1/2 w-[48%] aspect-square
				-translate-x-1/2 -translate-y-1/2
				rounded-full bg-black
				shadow-[inset_0_2px_3px_rgba(0,0,0,0.95),inset_0_-1px_1px_rgba(255,255,255,0.15)]"
			></div>
		</div>
	</div>
	<div
		class="pointer-events-none absolute inset-0 rounded-full
		bg-[linear-gradient(30deg,transparent_35%,rgba(255,255,255,0.22)_48%,rgba(255,255,255,0.45)_50%,rgba(255,255,255,0.22)_52%,transparent_65%)]"
	></div>

	<div class="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/10"></div>
</div>

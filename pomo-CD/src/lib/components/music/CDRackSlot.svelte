<script lang="ts">
	import type { Playlist } from '$lib/data/playlists';

	let {
		playlist,
		art,
		active,
		switching,
		disabled,
		index,
		onselect
	}: {
		playlist: Playlist;
		art: string | null;
		active: boolean;
		switching: boolean;
		disabled: boolean;
		index: number;
		onselect: () => void;
	} = $props();

	// Alternating, slightly-varied tilt so the stack reads as leaning racked
	// cases rather than a machined list — cd-rack-redesign-plan.md Step 8a.
	let tilt = $derived((index % 2 === 0 ? -1 : 1) * (0.3 + (index % 3) * 0.15));
</script>

{#if active && !switching}
	<!-- The playing disc is out of the rack, spinning in the player — the
	     slot it left behind sits empty (cd-rack-redesign-plan.md Step 11)
	     instead of showing a "selected" case. -->
	<div
		class="relative flex h-12 w-full items-center justify-center rounded-[2px]
			bg-black/35 shadow-[inset_0_5px_10px_rgba(0,0,0,0.6),inset_0_-1px_0_rgba(255,255,255,0.05),inset_0_0_0_1px_rgba(0,0,0,0.3)]"
		role="status"
		aria-label={`Now playing: ${playlist.artist ? `${playlist.artist} - ` : ''}${playlist.album || playlist.name}`}
	>
		<span class="pointer-events-none absolute inset-x-2 top-0.5 h-px bg-white/5"></span>
		<span class="text-[0.6rem] tracking-wide text-white/25 uppercase">Now Playing</span>
	</div>
{:else}
	<button
		type="button"
		style:--tilt="{tilt}deg"
		class="cd-rack-slot group relative flex h-12 w-full items-stretch overflow-hidden rounded-[2px]
			border-t border-white/40 shadow-[0_2px_0_rgba(0,0,0,0.35),0_3px_5px_rgba(0,0,0,0.28)]
			transition-[transform,box-shadow] duration-150 ease-out
			disabled:cursor-not-allowed disabled:opacity-60"
		{disabled}
		onclick={onselect}
		aria-pressed={active}
		aria-label={`Select ${playlist.artist ? `${playlist.artist} - ` : ''}${playlist.album || playlist.name}`}
	>
		<!-- printed spine label: album art full-bleed, gives every row its own
		     color the way real CD spines vary, no separate sliver image needed -->
		<span class="absolute inset-0">
			{#if art}
				<img src={art} alt="" class="h-full w-full object-cover" loading="lazy" />
			{:else}
				<span
					class="block h-full w-full bg-linear-to-br from-(--material-panel-from) to-(--material-panel-to)"
				></span>
			{/if}
		</span>

		<!-- legibility scrim behind the printed text -->
		<span
			class="pointer-events-none absolute inset-0 bg-linear-to-r from-black/70 via-black/35 to-transparent"
		></span>

		<!-- light-catching plastic edge, left side -->
		<span
			class="pointer-events-none absolute inset-y-0 left-0 w-2
				bg-linear-to-r from-white/35 to-transparent"
		></span>

		<!-- case-lid hairline along the top -->
		<span class="pointer-events-none absolute top-0 right-0 left-0 h-px bg-white/50"></span>

		<span
			class="relative z-10 flex min-w-0 flex-1 flex-col justify-center gap-0.5 py-1 pr-2 pl-4 text-left"
		>
			<span class="truncate text-xs font-semibold text-white drop-shadow-sm">
				{playlist.artist || playlist.album}
			</span>
			<span class="truncate text-[0.65rem] text-white/80">{playlist.album || playlist.name}</span>
		</span>

		{#if switching}
			<span class="absolute inset-0 z-20 grid place-items-center bg-black/45">
				<span class="loading loading-spinner loading-xs text-white"></span>
			</span>
		{/if}
	</button>
{/if}

<style>
	.cd-rack-slot {
		transform: rotate(var(--tilt, 0deg));
	}

	.cd-rack-slot:hover {
		transform: rotate(0deg) translateX(1px);
	}
</style>

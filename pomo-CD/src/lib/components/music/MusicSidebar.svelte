<script lang="ts">
	import { playlists } from '$lib/data/playlists';
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';
	import { timer } from '$lib/stores/timer.svelte';
	import { albumArtStore } from '$lib/stores/albumArt.svelte';
	import CDRackSlot from './CDRackSlot.svelte';
	import { onMount } from 'svelte';

	let currentPlaylist = $state(playlists[0]);

	onMount(() => {
		youtubePlayer.setPlaylist(currentPlaylist.id, false);
	});

	function selectPlaylist(playlist: (typeof playlists)[number]) {
		currentPlaylist = playlist;
		youtubePlayer.setPlaylist(playlist.id, timer.isRunning);
	}
</script>

<!-- Whole-panel wood-tower chassis (cd-rack-redesign-plan.md) — the entire
     sidebar is the rack housing: header, spine stack, footer text. -->
<div class="cd-tower relative flex h-full min-h-full w-full flex-col">
	<div class="cd-tower__trim absolute inset-y-0 left-1.5 w-1 rounded-full"></div>
	<div class="cd-tower__trim absolute inset-y-0 right-1.5 w-1 rounded-full"></div>

	<div class="relative flex flex-1 flex-col overflow-y-auto p-4 pr-4 pl-6 text-white">
		<h2 class="mb-4 text-xl font-bold">Music Library</h2>

		<!-- Recessed compartment for the spine stack, sunk into the wood
		     carcass above — faint wire-rung lines behind the rows. -->
		<div
			class="cd-tower__rungs relative flex flex-col gap-2 rounded-sm p-2
				shadow-[inset_0_3px_8px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(0,0,0,0.4)]"
		>
			{#each playlists as playlist, index (playlist.id)}
				<CDRackSlot
					{playlist}
					{index}
					art={albumArtStore.get(playlist.id)}
					active={currentPlaylist.id === playlist.id}
					switching={youtubePlayer.isSwitching && youtubePlayer.currentPlaylistId === playlist.id}
					disabled={youtubePlayer.isSwitching}
					onselect={() => selectPlaylist(playlist)}
				/>
			{/each}
		</div>

		<div class="my-4 h-px bg-white/15"></div>
		<p class="text-sm text-white/70">Custom playlist input coming soon...</p>
		<p class="text-white/90">Selected: {currentPlaylist.name}</p>
	</div>
</div>

<style>
	/* Walnut tower carcass — layered grain streaks + top sheen + bottom
	   vignette on top of the base gradient, modeled on the reference rack
	   photos (cd-rack-redesign-plan.md Step 12). */
	.cd-tower {
		background-image:
			repeating-linear-gradient(
				95deg,
				rgb(0 0 0 / 0.09) 0px,
				rgb(0 0 0 / 0.09) 1px,
				transparent 1px,
				transparent 3px,
				rgb(255 255 255 / 0.03) 3px,
				rgb(255 255 255 / 0.03) 4px,
				transparent 4px,
				transparent 9px
			),
			repeating-linear-gradient(
				87deg,
				rgb(0 0 0 / 0.06) 0px,
				rgb(0 0 0 / 0.06) 2px,
				transparent 2px,
				transparent 17px
			),
			radial-gradient(120% 70% at 50% 0%, rgb(255 220 180 / 0.08), transparent 60%),
			radial-gradient(140% 90% at 50% 100%, rgb(0 0 0 / 0.4), transparent 55%),
			linear-gradient(to bottom, var(--wood-from), var(--wood-via), var(--wood-to));
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.08),
			inset 0 -2px 4px rgba(0, 0, 0, 0.4);
		border-right: 1px solid rgb(0 0 0 / 0.4);
	}

	/* Fluted/reeded wood trim strips, echoing the cabinet photo's corner
	   reeding — repeating vertical stripes of light/dark grain. */
	.cd-tower__trim {
		background-image: repeating-linear-gradient(
			90deg,
			var(--wood-highlight) 0px,
			var(--wood-highlight) 1px,
			transparent 1px,
			transparent 3px,
			var(--wood-grain) 3px,
			var(--wood-grain) 4px
		);
	}

	/* Faint horizontal wire-rung lines behind the spine stack, evoking the
	   wire-tower photo's rungs even though rows are solid divs. */
	.cd-tower__rungs::before {
		content: '';
		position: absolute;
		inset: -0.25rem 0;
		pointer-events: none;
		background-image: repeating-linear-gradient(
			to bottom,
			transparent 0,
			transparent 3rem,
			rgb(255 255 255 / 0.08) 3rem,
			rgb(255 255 255 / 0.08) calc(3rem + 1px),
			transparent calc(3rem + 1px),
			transparent 3.5rem
		);
	}
</style>

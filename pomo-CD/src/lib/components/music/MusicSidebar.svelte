<script lang="ts">
	import { playlists } from '$lib/data/playlists';
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';
	import { timer } from '$lib/stores/timer.svelte';
	import { albumArtStore } from '$lib/stores/albumArt.svelte';
	import CDRackSlot from './CDRackSlot.svelte';
	import { onMount } from 'svelte';

	let currentPlaylist = $state(playlists[0]);

	let genres = $derived([...new Set(playlists.map((p) => p.genre))]);
	let selectedGenre = $state<string>('All');
	let filteredPlaylists = $derived(
		selectedGenre === 'All' ? playlists : playlists.filter((p) => p.genre === selectedGenre)
	);

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

		<!-- Genre divider cards — genre-filter-plan.md Step 3, restyled after a
		     record-shelf divider-card reference photo: a thick-bordered card
		     standing taller than the rack rows below, label running sideways
		     along the spine, selecting one inverts it to a solid black card
		     ("Concept L"). -->
		<div class="mb-3 flex flex-wrap items-end gap-1.5" role="group" aria-label="Filter by genre">
			<button
				type="button"
				class="genre-card"
				class:genre-card--active={selectedGenre === 'All'}
				aria-pressed={selectedGenre === 'All'}
				onclick={() => (selectedGenre = 'All')}
			>
				<span class="genre-card__label">All</span>
			</button>
			{#each genres as genre (genre)}
				<button
					type="button"
					class="genre-card"
					class:genre-card--active={selectedGenre === genre}
					aria-pressed={selectedGenre === genre}
					onclick={() => (selectedGenre = genre)}
				>
					<span class="genre-card__label">{genre}</span>
				</button>
			{/each}
		</div>

		<!-- Recessed compartment for the spine stack, sunk into the wood
		     carcass above — faint wire-rung lines behind the rows. -->
		<div
			class="cd-tower__rungs relative flex flex-col gap-2 rounded-sm p-2
				shadow-[inset_0_3px_8px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(0,0,0,0.4)]"
		>
			{#each filteredPlaylists as playlist, index (playlist.id)}
				<CDRackSlot
					{playlist}
					{index}
					art={albumArtStore.get(playlist.id)}
					active={currentPlaylist.id === playlist.id}
					switching={youtubePlayer.isSwitching && youtubePlayer.currentPlaylistId === playlist.id}
					disabled={youtubePlayer.isSwitching}
					onselect={() => selectPlaylist(playlist)}
				/>
			{:else}
				<p class="py-2 text-center text-sm text-white/50">No playlists in this genre yet.</p>
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

	/* Genre divider card — thick-bordered card standing taller than the rack
	   rows, label rotated to read sideways along the spine like a real
	   record-shelf divider. Selecting one is a persistent "currently
	   filtering by this genre" state, so it inverts to a solid black card
	   rather than reusing any momentary press feedback. */
	.genre-card {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 1.85rem;
		height: 4rem;
		border-radius: 4px;
		border: 3px solid #141414;
		background: #f2f1ec;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
		transition:
			background 0.15s ease,
			border-color 0.15s ease,
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}

	.genre-card:hover {
		transform: translateY(-1px);
	}

	.genre-card:focus-visible {
		outline: 2px solid var(--color-info);
		outline-offset: 2px;
	}

	.genre-card__label {
		display: inline-block;
		white-space: nowrap;
		transform: rotate(-90deg);
		font-size: 0.6rem;
		font-weight: 800;
		letter-spacing: -0.01em;
		text-transform: uppercase;
		color: #141414;
		transition: color 0.15s ease;
	}

	.genre-card--active {
		background: #141414;
		border-color: #141414;
		transform: translateY(-2px);
		box-shadow:
			0 4px 8px rgba(0, 0, 0, 0.5),
			0 0 0 2px color-mix(in srgb, var(--color-warning) 85%, transparent);
	}

	.genre-card--active:hover {
		transform: translateY(-2px);
	}

	.genre-card--active .genre-card__label {
		color: #f2f1ec;
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

<script lang="ts">
	import { playlists } from '$lib/data/playlists';
	import { setPlaylist } from '$lib/services/youtubePlayer';
	import { timer } from '$lib/stores/timer.svelte';
	import { onMount } from 'svelte';
	let currentPlaylist = $state(playlists[0]);
	onMount(() => {
		setPlaylist(currentPlaylist.id, false);
	});
</script>

<div class="p-4 min-h-full bg-base-200">
	<h2 class="text-xl font-bold mb-4">Music Library</h2>

	<ul class="menu gap-2">
		{#each playlists as playlist (playlist.id)}
			<button class="btn btn-neutral mt-5 mb-5" 
			onclick={() => {
				currentPlaylist = playlist;
				setPlaylist(playlist.id, timer.isRunning);}} aria-label="Select playlist">
				{playlist.name}
			</button>
		{/each}
	</ul>

	<div class="divider"></div>

	<p class="text-sm opacity-60">
		Custom playlist input coming soon...
	</p>

	<p>Selected: {currentPlaylist.name}</p>
</div>
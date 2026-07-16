class AlbumArtStore {
	art = $state<Record<string, string | null>>({});

	hydrate(initial: Record<string, string | null>) {
		this.art = initial;
	}

	get(playlistId: string | null): string | null {
		if (!playlistId) return null;
		return this.art[playlistId] ?? null;
	}
}

export const albumArtStore = new AlbumArtStore();
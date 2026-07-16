const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7;

type CacheEntry = { url: string | null; expiresAt: number };
const cache = new Map<string, CacheEntry>();

export async function getAlbumArt(artist: string, album: string): Promise<string | null> {
	const cacheKey = `${artist}::${album}`.toLowerCase();
	const cached = cache.get(cacheKey);
	if (cached && cached.expiresAt > Date.now()) {
		return cached.url;
	}

	const term = encodeURIComponent(`${artist} ${album}`);
	const url = `https://itunes.apple.com/search?term=${term}&entity=album&limit=1`;

	try {
		const res = await fetch(url);
		if (!res.ok) {
			cache.set(cacheKey, { url: null, expiresAt: Date.now() + CACHE_TTL_MS });
			return null;
		}

		const data = await res.json();
		const result = data.results?.[0];
		const art = result?.artworkUrl100
			? result.artworkUrl100.replace('100x100bb', '1200x1200bb')
			: null;

		cache.set(cacheKey, { url: art, expiresAt: Date.now() + CACHE_TTL_MS });
		return art;
	} catch (err) {
		console.error(`Artwork lookup failed for ${artist} - ${album}:`, err);
		return null;
	}
}

export async function getAlbumArtForAll(
	items: { id: string; artist: string; album: string }[]
): Promise<Record<string, string | null>> {
	const results = await Promise.all(
		items.map(async (item) => [item.id, await getAlbumArt(item.artist, item.album)] as const)
	);
	return Object.fromEntries(results);
}
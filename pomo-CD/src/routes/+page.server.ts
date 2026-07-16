import { playlists } from '$lib/data/playlists';
import { getAlbumArtForAll } from '$lib/server/albumAPI';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const albumArt = await getAlbumArtForAll(playlists);
	return { albumArt };
};
import { currentThumbnail } from '$lib/stores/music';

let player: YT.Player | null = null;
let isReady = false;

export function initYouTubePlayer() {
	if (typeof window === 'undefined') return;

	if (!window.YT) {
		const tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
		document.body.appendChild(tag);
	}

	window.onYouTubeIframeAPIReady = () => {
		player = new window.YT.Player('player', {
			height: '0',
			width: '0',
			playerVars: {
				listType: 'playlist',
				list: 'PLGVZe8tVzNTmuGVsoHjphFz7wBYmd5DVD',
				autoplay: 1,
				mute: 1
			},
			events: {
				onReady: () => {
					isReady = true;
				},
				onStateChange: (event: YT.OnStateChangeEvent) => {
					console.log(event.data);

					switch (event.data) {
						case window.YT.PlayerState.PLAYING:
							console.log('Playing');
							updateThumbnail();
							break;

						case window.YT.PlayerState.PAUSED:
							console.log('Paused');
							break;

						case window.YT.PlayerState.ENDED:
							console.log('Ended');
							break;

						case window.YT.PlayerState.BUFFERING:
							console.log('Buffering');
							break;
					}
				}
			}
		});
	};
}

export function playMusic() {
	if (!isReady || !player) return;
	player.playVideo();
	const data = player.getVideoData();
	console.log('Playing video with ID:', data.video_id);
	setTimeout(() => {
		console.log(getCurrentThumbnail());
	}, 2000);
	updateThumbnail();
}

export function pauseMusic() {
	if (!isReady || !player) return;
	player.pauseVideo();
}

export function nextSong() {
	if (!isReady || !player) return;
	player.nextVideo();
}

export function unmuteMusic() {
	if (!isReady || !player) return;
	player.unMute();
}

export function debugPlayer() {
	console.log('player:', player);
	console.log('ready:', isReady);
}

export function getCurrentThumbnail(): string | null {
	if (!player) return null;

	const videoId = player.getVideoData()?.video_id;
	if (!videoId) return null;

	return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function updateThumbnail() {
	if (!player) return;

	const videoId = player.getVideoData()?.video_id;

	if (!videoId) return;

	currentThumbnail.set(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
	console.log('Updated thumbnail to:', `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
}

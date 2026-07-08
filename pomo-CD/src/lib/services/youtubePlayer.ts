import { currentThumbnail } from '$lib/stores/music';

let player: YT.Player | null = null;
let isReady = false;

let pendingPlaylistId: string | null = null;
let pendingShouldPlay = false;

let switchToken = 0;

export function setPlaylist(playlistId: string, shouldPlay = false) {
	console.log(`SETPLAYLIST: ${playlistId}, shouldPlay: ${shouldPlay}`);

	if (!isReady || !player) {
		pendingPlaylistId = playlistId;
		pendingShouldPlay = shouldPlay;
		return;
	}

	applyPlaylist(playlistId, shouldPlay);
}

function applyPlaylist(playlistId: string, shouldPlay: boolean) {
	const myToken = ++switchToken;
	currentThumbnail.set(null); // "eject the CD"
	issueCue(playlistId);
	waitForCue(myToken, playlistId, shouldPlay);
}

function issueCue(playlistId: string) {
	player!.stopVideo();
	player!.cuePlaylist({ listType: 'playlist', list: playlistId });
}

// Confirms the cue actually landed, resending it if it seems to have been dropped.
function waitForCue(token: number, playlistId: string, shouldPlay: boolean, attempt = 0) {
	if (token !== switchToken || !player) return; // superseded by a newer switch
	if (attempt > 50) return; // ~10s safety net, give up

	if (player.getPlayerState() === window.YT.PlayerState.CUED) {
		updateThumbnail(); // only trust the thumbnail once genuinely CUED
		if (shouldPlay) waitForPlay(token);
		return;
	}

	// cue command may have been silently ignored - resend it periodically
	if (attempt > 0 && attempt % 15 === 0) {
		issueCue(playlistId);
	}

	setTimeout(() => waitForCue(token, playlistId, shouldPlay, attempt + 1), 200);
}

// Confirms playback actually started, resending playVideo() if it seems to have been dropped.
function waitForPlay(token: number, attempt = 0) {
	if (token !== switchToken || !player) return;
	if (attempt > 30) return; // ~6s safety net

	if (player.getPlayerState() === window.YT.PlayerState.PLAYING) return; // confirmed

	player.playVideo();
	setTimeout(() => waitForPlay(token, attempt + 1), 200);
}

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
				autoplay: 1,
				mute: 1
			},
			events: {
				onReady: () => {
					isReady = true;
					if (pendingPlaylistId) {
						applyPlaylist(pendingPlaylistId, pendingShouldPlay);
						pendingPlaylistId = null;
					}
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
						case window.YT.PlayerState.CUED:
							console.log('Cued');
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

export function changeVolume(volume: number) {
	if (!isReady || !player) return;
	player.setVolume(volume);
}
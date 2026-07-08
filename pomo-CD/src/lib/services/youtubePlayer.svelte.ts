const POLL_INTERVAL_MS = 200;
const RESEND_EVERY_N_POLLS = 15;
const MAX_POLLS = 50;

class YouTubePlayerStore {
	
	isReady = $state(false);
	isSwitching = $state(false);
	currentPlaylistId = $state<string | null>(null);
	playerState = $state<YT.PlayerState | null>(null);
	volume = $state(50);
	thumbnail = $state<string | null>(null);

	player: YT.Player | null = null;
	private pendingPlaylistId: string | null = null;
	private pendingShouldPlay = false;
	private switchToken = 0;

	init() {
		if (typeof window === 'undefined') return;

	if (!window.YT) {
		const tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
		document.body.appendChild(tag);
	}

	window.onYouTubeIframeAPIReady = () => {
		this.player = new window.YT.Player('player', {
			height: '0',
			width: '0',
			playerVars: {
				autoplay: 1,
				mute: 1
			},
			events: {
				onReady: () => {
					this.isReady = true;
					if (this.pendingPlaylistId) {
						this.setPlaylist(this.pendingPlaylistId, this.pendingShouldPlay);
						this.pendingPlaylistId = null;
					}
				},
				onStateChange: (event: YT.OnStateChangeEvent) => {
					console.log(event.data);

					switch (event.data) {
						case window.YT.PlayerState.PLAYING:
							console.log('Playing');
							this.updateThumbnail();
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

setPlaylist(playlistId: string, shouldPlay = false) {
	if (!this.isReady || !this.player) {
		this.pendingPlaylistId = playlistId;
		this.pendingShouldPlay = shouldPlay;
		return;
	}
	const myToken = ++this.switchToken;
	this.currentPlaylistId = playlistId;
	this.isSwitching = true;
	this.thumbnail = null; // "eject the CD"

	const cue = () => {
		this.player!.stopVideo();
		this.player!.cuePlaylist({ listType: 'playlist', list: playlistId });
	}
	cue();

	this.pollUntil(
			myToken,
			() => this.player!.getPlayerState() === window.YT.PlayerState.CUED,
			cue,
			() => {
				this.updateThumbnail(); // only trust the thumbnail once genuinely CUED
				if (shouldPlay) {
					this.pollUntil(
						myToken,
						() => this.player!.getPlayerState() === window.YT.PlayerState.PLAYING,
						() => this.player!.playVideo(),
						() => (this.isSwitching = false)
					);
				} else {
					this.isSwitching = false;
				}
			}
		);
}

// Polls until isDone() is true, calling resend() periodically in case the
	// underlying command was silently dropped (a known YouTube IFrame API quirk).
	// Bails if a newer playlist switch has superseded this one.
	private pollUntil(token: number, isDone: () => boolean, resend: () => void, onDone?: () => void) {
		let attempt = 0;

		const tick = () => {
			if (token !== this.switchToken || !this.player) return;
			if (attempt > MAX_POLLS) {
				this.isSwitching = false;
				return;
			}

			if (isDone()) {
				onDone?.();
				return;
			}

			if (attempt > 0 && attempt % RESEND_EVERY_N_POLLS === 0) {
				resend();
			}

			attempt++;
			setTimeout(tick, POLL_INTERVAL_MS);
		};

		tick();
	}

	play() {
		if (!this.isReady || !this.player) return;
		this.player.playVideo();
		this.updateThumbnail();
	}

	pause() {
		if (!this.isReady || !this.player) return;
		this.player.pauseVideo();
	}

	next() {
		if (!this.isReady || !this.player) return;
		this.player.nextVideo();
	}

	unmute() {
		if (!this.isReady || !this.player) return;
		this.player.unMute();
	}

	setVolume(volume: number) {
		this.volume = volume;
		if (this.isReady && this.player) {
			this.player.setVolume(volume);
		}
	}

	private updateThumbnail() {
		const videoId = this.player?.getVideoData()?.video_id;
		if (!videoId) return;
		this.thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
	}
}

export const youtubePlayer = new YouTubePlayerStore();
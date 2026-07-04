// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace YT {
		interface Player {
			playVideo(): void;
			pauseVideo(): void;
			mute(): void;
			unMute(): void;
			getVideoData(): { video_id: string };
			nextVideo(): void;
		}

		enum PlayerState {
			UNSTARTED = -1,
			ENDED = 0,
			PLAYING = 1,
			PAUSED = 2,
			BUFFERING = 3,
			CUED = 5
		}

		interface OnStateChangeEvent {
			data: PlayerState;
		}
	}

	interface Window {
		YT: {
			Player: new (elementId: string, config: unknown) => YT.Player;
			PlayerState: typeof YT.PlayerState;
		};
		onYouTubeIframeAPIReady: () => void;
	}
}

export {};

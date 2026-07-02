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
	}

	interface Window {
		YT: typeof YT;
		onYouTubeIframeAPIReady: () => void;
	}
}

export {};

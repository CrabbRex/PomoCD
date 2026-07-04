import { debugPlayer, pauseMusic, playMusic, unmuteMusic } from "$lib/services/youtubePlayer";

class TimerStore {
    totalSeconds = $state(2 * 60);
	secondsLeft = $state(this.totalSeconds);

	rotation = $state(0);

	isRunning = $state(false);


	interval: ReturnType<typeof setInterval> | null = null;

	startStop() {
		if (this.isRunning) {
			this.stop();
		} else {
			this.start();
		}
	}

	start() {
		console.log("HERE");
		if (this.interval) return; // Timer is already running

		this.isRunning = true;
		playMusic();
		unmuteMusic();
		debugPlayer();

		this.interval = setInterval(() => {
			if (this.secondsLeft > 0) {
				this.secondsLeft -= 1;
				console.log("Seconds left:", this.secondsLeft);
			} else {
				stop();
			}
		}, 1000);
	}

	stop() {
		this.isRunning = false;
		pauseMusic();
		if (this.interval) {
			clearInterval(this.interval);
		}
		this.interval = null;
	}

	reset() {
		this.stop();
		this.secondsLeft = this.totalSeconds;
	}
}

export const timer = new TimerStore();
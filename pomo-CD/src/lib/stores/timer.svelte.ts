class TimerStore {
    totalSeconds = $state(2 * 60);
	secondsLeft = $state(this.totalSeconds);

	rotation = $state(0);

	isRunning = $state(false);


	interval: ReturnType<typeof setInterval> | null = null;

	start() {
		console.log("HERE");
		if (this.interval) return; // Timer is already running

		this.isRunning = true;

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
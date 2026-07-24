import { youtubePlayer } from "$lib/services/youtubePlayer.svelte";

export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

const SESSIONS_UNTIL_LONG_BREAK = 4;


class TimerStore {
	mode = $state<TimerMode>('work');
	rotation = $state(0);

	isRunning = $state(false);
	completedWorkSessions = $state(0);

	durationMinutes = $state<Record<TimerMode, number>>({
		work: 25,
		shortBreak: 5,
		longBreak: 15
	});
	secondsLeft = $state(this.durationMinutes.work * 60);
	totalSeconds = $derived(this.durationMinutes[this.mode] * 60);
	progress = $derived(1 - this.secondsLeft / this.totalSeconds);

	phaseLabel = $derived(
		this.mode === 'work' ? 'Focus' : this.mode === 'shortBreak' ? 'Short Break' : 'Long Break'
	);
	sessionsUntilLongBreak = SESSIONS_UNTIL_LONG_BREAK;

	// how many work sessions completed within the current cycle (0 to sessionsUntilLongBreak)
	sessionsCompletedInCycle = $derived(
		this.completedWorkSessions > 0 && this.completedWorkSessions % this.sessionsUntilLongBreak === 0
			? this.sessionsUntilLongBreak
			: this.completedWorkSessions % this.sessionsUntilLongBreak
	);

	// which work session (1-based) is in progress, or was just completed if on a break
	currentSessionNumber = $derived(
		this.mode === 'work'
			? (this.completedWorkSessions % this.sessionsUntilLongBreak) + 1
			: this.sessionsCompletedInCycle
	);

	interval: ReturnType<typeof setInterval> | null = null;

	startStop() {
		if (this.isRunning) {
			this.pause();
		} else {
			this.start();
		}
	}

	start() {
		this.isRunning = true;
		youtubePlayer.play();
		youtubePlayer.unmute();

		this.interval = setInterval(() => {
			if (this.secondsLeft > 0) {
				this.secondsLeft -= 1;
			} else {
				this.completePhase();
			}
		}, 1000);
	}

	pause() {
		this.isRunning = false;
		youtubePlayer.pause();
		if (this.interval) {
			clearInterval(this.interval);
		}
		this.interval = null;
	}

	reset() {
		this.pause();
		this.secondsLeft = this.totalSeconds;
	}

	skip() {
		this.completePhase();
	}

	setDuration(mode: TimerMode, minutes: number) {
		const clamped = Math.max(1, Math.round(minutes));
		this.durationMinutes[mode] = clamped;

		if (mode === this.mode && !this.isRunning) {
			this.secondsLeft = clamped * 60;
		}
	}

	private completePhase() {
		this.pause();

		if (this.mode === 'work') {
			this.completedWorkSessions += 1;
			this.mode =
				this.completedWorkSessions % SESSIONS_UNTIL_LONG_BREAK === 0 ? 'longBreak' : 'shortBreak';
		} else {
			this.mode = 'work';
		}

		this.secondsLeft = this.totalSeconds;
		this.start(); // auto-advance into the next phase
	}
}

export const timer = new TimerStore();
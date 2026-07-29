import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { timer } from '../../lib/stores/timer.svelte';

function resetTimer() {
	timer.pause();
	timer.mode = 'work';
	timer.completedWorkSessions = 0;
	timer.durationMinutes = { work: 25, shortBreak: 5, longBreak: 15 };
	timer.secondsLeft = timer.totalSeconds;
}

beforeEach(() => {
	resetTimer();
});

afterEach(() => {
	resetTimer();
	vi.useRealTimers();
});

describe('TimerStore skip()', () => {
	it('does not resume playback when skipping while paused', () => {
		expect(timer.isRunning).toBe(false);

		timer.skip();

		expect(timer.isRunning).toBe(false);
		expect(timer.mode).toBe('shortBreak');
	});

	it('keeps playing when skipping while running', () => {
		timer.start();
		expect(timer.isRunning).toBe(true);

		timer.skip();

		expect(timer.isRunning).toBe(true);
		expect(timer.mode).toBe('shortBreak');
	});

	it('auto-advances and keeps running when a running phase completes naturally', () => {
		vi.useFakeTimers();
		timer.secondsLeft = 1;
		timer.start();

		vi.advanceTimersByTime(2000); // 1st tick: secondsLeft 1->0; 2nd tick: completePhase

		expect(timer.isRunning).toBe(true);
		expect(timer.mode).toBe('shortBreak');
	});
});

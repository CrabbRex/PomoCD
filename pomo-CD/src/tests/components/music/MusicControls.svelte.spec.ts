import { page } from 'vitest/browser';
import { afterEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { tick } from 'svelte';
import MusicControls from '../../../lib/components/music/MusicControls.svelte';
import { timer } from '../../../lib/stores/timer.svelte';

// Setting timer.isRunning directly (not via start()/startStop()) avoids
// spinning up the real countdown interval or touching youtubePlayer.
afterEach(() => {
	timer.isRunning = false;
});

describe('MusicControls button-overhaul markup', () => {
	it('wraps the previous, play/pause, and next caps in a housing well', async () => {
		render(MusicControls);

		for (const label of ['Previous song', 'Start/Stop Timer', 'Next song']) {
			const button = page.getByRole('button', { name: label });
			await expect.element(button).toBeInTheDocument();
			const well = button.element().closest('.btn-well');
			expect(well).not.toBeNull();
		}
	});

	it('gives the play/pause cap a status LED element', async () => {
		render(MusicControls);

		const playPause = page.getByRole('button', { name: 'Start/Stop Timer' });
		const led = playPause.element().querySelector('.led');
		expect(led).not.toBeNull();
	});

	it('lights the LED only while the timer is running', async () => {
		render(MusicControls);

		const playPause = page.getByRole('button', { name: 'Start/Stop Timer' });

		expect(playPause.element().classList.contains('is-on')).toBe(false);

		timer.isRunning = true;
		await tick();
		expect(playPause.element().classList.contains('is-on')).toBe(true);

		timer.isRunning = false;
		await tick();
		expect(playPause.element().classList.contains('is-on')).toBe(false);
	});
});

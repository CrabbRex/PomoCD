import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import TimerControl from '../../../lib/components/timer/TimerControl.svelte';

describe('TimerControl button-overhaul markup', () => {
	it('wraps the skip cap in a housing well', async () => {
		render(TimerControl);

		const button = page.getByRole('button', { name: 'Skip to next phase' });
		await expect.element(button).toBeInTheDocument();
		const well = button.element().closest('.btn-well');
		expect(well).not.toBeNull();
	});
});

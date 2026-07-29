import { page } from 'vitest/browser';
import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Volume from '../../../lib/components/music/volume.svelte';
// Tailwind is only entered via +layout.svelte in the app; pull it in here so
// the arbitrary-value md: classes under test actually get generated.
import '../../../routes/layout.css';

// md: classes only activate above Tailwind's 768px breakpoint, independent of
// the container query the clamp itself reads from.
beforeEach(async () => {
	await page.viewport(1024, 800);
});

// The vertical slider's md: height is clamp(10rem, 42cqh, 18rem), read from the
// nearest container-type:size ancestor. These pin down that formula against
// real container heights so a future edit can't silently shrink the slider
// back to the pre-fix "smaller than usual" size (previously clamp(8rem, 34cqh, 18rem)
// and, before that, a viewport-width formula that stayed pinned near 18rem
// regardless of actual available height).
async function renderInContainer(height: number) {
	const result = render(Volume, { isCompact: false });
	const containerEl = result.container as HTMLElement;
	containerEl.style.containerType = 'size';
	containerEl.style.width = '400px';
	containerEl.style.height = `${height}px`;
	await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
	return page.getByRole('slider');
}

describe('Volume.svelte desktop slider height', () => {
	it('is pinned to the 18rem (288px) max in a tall container', async () => {
		const slider = await renderInContainer(736); // ~1920x1080 CD panel height
		await expect.element(slider).toBeInTheDocument();
		const height = slider.element().getBoundingClientRect().height;
		expect(height).toBeGreaterThan(280); // near the 18rem ceiling, not the old ~250px regression
		expect(height).toBeLessThanOrEqual(289);
	});

	it('scales between the clamp bounds in a mid-size container', async () => {
		const slider = await renderInContainer(500); // 42% of 500 = 210px
		const height = slider.element().getBoundingClientRect().height;
		expect(height).toBeGreaterThan(195);
		expect(height).toBeLessThan(225);
	});

	it('is pinned to the 10rem (160px) floor in a short container', async () => {
		const slider = await renderInContainer(300); // 42% of 300 = 126px, below the floor
		const height = slider.element().getBoundingClientRect().height;
		expect(height).toBeGreaterThanOrEqual(159);
		expect(height).toBeLessThan(170);
	});
});

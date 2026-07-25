<script lang="ts">
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';
	import { timer } from '$lib/stores/timer.svelte';
	import Volume from '$lib/components/music/volume.svelte';
	import NowPlaying from '$lib/components/music/NowPlaying.svelte';

	// Below this rendered height, the stacked button column (~20.5rem natural
	// height at md: size) can't fit without clipping — switch to a compact
	// horizontal layout instead of letting it scroll. Set with margin above
	// compact mode's own ~21rem floor, so overflow-y-auto below is a true
	// last resort, not the common case.
	const COMPACT_HEIGHT_THRESHOLD = 400; // px, ~25rem
	const MD_BREAKPOINT = 768; // px — matches Tailwind's `md:`; below this, mobile/landscape layouts already handle their own fit

	let rootEl: HTMLDivElement | undefined = $state();
	let isCompact = $state(false);

	$effect(() => {
		if (!rootEl) return;
		const el = rootEl;
		const observer = new ResizeObserver((entries) => {
			const height = entries[0].contentRect.height;
			isCompact = window.innerWidth >= MD_BREAKPOINT && height < COMPACT_HEIGHT_THRESHOLD;
		});
		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<div bind:this={rootEl} class="flex flex-col items-center justify-center gap-6 w-full md:h-full">
	<div
		class="flex items-center justify-center gap-6 sm:gap-10 flex-wrap
		md:flex-1 md:min-h-0 md:w-full md:overflow-y-auto md:overscroll-y-contain"
	>
		<div class="flex items-center justify-center shrink-0">
			<Volume {isCompact} />
		</div>

		<div class="flex items-center justify-center gap-6 {isCompact ? '' : 'flex-col'}">
			<button
				class="btn btn-physical btn-circle btn-xs sm:btn-sm md:btn-md m-2 sm:m-5"
				onclick={() => youtubePlayer.previous()}
				aria-label="Previous song"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="size-6"
				>
					<path
						d="M18.945 7.06c1.25-.713 2.805.19 2.805 1.629v8.122c0 1.44-1.555 2.343-2.805 1.628L12 14.47v2.34c0 1.44-1.555 2.343-2.805 1.628L2.087 14.378c-1.26-.72-1.26-2.536 0-3.256L9.195 7.06C10.445 6.347 12 7.25 12 8.69v2.34l6.945-3.97Z"
					/>
				</svg>
			</button>

			<button
				class="btn btn-physical btn-circle btn-sm sm:btn-md md:btn-lg m-2 sm:m-5"
				onclick={() => timer.startStop()}
				aria-label="Start/Stop Timer"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="size-6"
				>
					<path
						d="M15 6.75a.75.75 0 0 0-.75.75V18a.75.75 0 0 0 .75.75h.75a.75.75 0 0 0 .75-.75V7.5a.75.75 0 0 0-.75-.75H15ZM20.25 6.75a.75.75 0 0 0-.75.75V18c0 .414.336.75.75.75H21a.75.75 0 0 0 .75-.75V7.5a.75.75 0 0 0-.75-.75h-.75ZM5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L5.055 7.061Z"
					/>
				</svg>
			</button>
			<button
				class="btn btn-physical btn-circle btn-xs sm:btn-sm md:btn-md m-2 sm:m-5"
				onclick={() => youtubePlayer.next()}
				aria-label="Next song"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="size-6"
				>
					<path
						d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z"
					/>
				</svg>
			</button>
		</div>
	</div>

	<div class="w-full md:shrink-0">
		<NowPlaying />
	</div>
</div>

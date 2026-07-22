<script>
	import { youtubePlayer } from '$lib/services/youtubePlayer.svelte';
	import { timer } from '$lib/stores/timer.svelte';
	import Volume from '$lib/components/music/volume.svelte';
</script>

<div class="flex items-center justify-center gap-6 sm:gap-10">
	<div class="flex items-center justify-center shrink-0">
		<Volume />
	</div>

	<div class="flex flex-col items-center justify-center gap-6">
		<button
			class="btn btn-neutral m-2 sm:m-5"
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
			class="btn btn-neutral btn-lg m-2 sm:m-5"
			onclick={() => timer.startStop()}
			aria-label="Previous song"
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
        <button class="btn btn-neutral m-2 sm:m-5" onclick={() => youtubePlayer.next()} aria-label="Next song">
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

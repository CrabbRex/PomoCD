<script lang="ts">
	import { timer, type TimerMode } from '$lib/stores/timer.svelte';

	const fields: { mode: TimerMode; label: string }[] = [
		{ mode: 'work', label: 'Focus' },
		{ mode: 'shortBreak', label: 'Short Break' },
		{ mode: 'longBreak', label: 'Long Break' }
	];
</script>

<div class="flex flex-col gap-3">
	<h3 class="font-semibold text-sm opacity-70">Durations (minutes)</h3>
	{#each fields as { mode, label } (mode)}
		<label class="form-control">
			<span class="label-text">{label}</span>
			<input
				type="number"
				min="1"
				class="input input-bordered input-sm w-24"
				bind:value={timer.durationMinutes[mode]}
				oninput={(e) => timer.setDuration(mode, Number(e.currentTarget.value))}
			/>
		</label>
	{/each}
</div>
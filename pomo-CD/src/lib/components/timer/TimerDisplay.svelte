<script>
    import { timer } from "$lib/stores/timer.svelte";
	import { formatTime } from "$lib/utils/time";
</script>

<div class="hover-3d">
        <h1 class="text-3xl font-bold text-white">{formatTime(timer.secondsLeft)}</h1>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
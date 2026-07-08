<script>
    import { changeVolume } from '$lib/services/youtubePlayer';
    let volume = $state(50);
</script>

<input type="range" min="0" max="100" bind:value={volume} oninput={() => {changeVolume(volume)}} class="range range-vertical" />
<p>Volume: {volume}</p>
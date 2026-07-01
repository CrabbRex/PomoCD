<script lang="ts">
    import { onDestroy } from 'svelte';

    let totalSeconds = 2 * 60;
    let secondsLeft = $state(totalSeconds);

    let roration = $state(0);

    let running = $state(false);

    const r = 90;
    const c = 2 * Math.PI * r;

    function progress() {
        return secondsLeft / totalSeconds;
    }

    setInterval(() => {
        if (running) {
            roration = (roration + 1) % 360;
        }
    }, 1000 / 60);

    let interval: ReturnType<typeof setInterval> | null = null;

    function startTimer() {
        if (interval) return; // Timer is already running

        running = true;

        interval = setInterval(() => {
            if (secondsLeft > 0) {
                secondsLeft -= 1;
            } else {
                stop();
            }
        }, 1000);
    }

    function stop() {
      running = false;
      if (interval) {
          clearInterval(interval);
      }
      interval = null;
    }

    function reset() {
        stop();
        secondsLeft = totalSeconds;
    }

    function formatTime(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    onDestroy(() => {
        stop();
    });
</script>

<div class="container">

  <!-- CD -->
  <div
    class="animate-cd-spin relative h-72 w-72 rounded-full bg-linear-to-br from-zinc-200 via-zinc-500 to-zinc-900 shadow-2xl"
    style:animation-play-state={running ? 'running' : 'paused'}
  >

  </div>


  <div class="text">
    <h1>{formatTime(secondsLeft)}</h1>
  </div>
</div>
<div class="timer">
    <h1>{formatTime(secondsLeft)}</h1>
    <button onclick={startTimer}>Start</button>
    <button onclick={stop}>Stop</button>
    <button onclick={reset}>Reset</button>
</div>


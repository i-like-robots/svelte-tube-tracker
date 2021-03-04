<script>
  import { onMount, onDestroy } from 'svelte'

  export let duration

  let frame
  let elapsed = 0
  let prevTime

  function tick() {
    frame = requestAnimationFrame(() => {
      prevTime = prevTime || window.performance.now()

      const time = window.performance.now()

      elapsed += time - prevTime
      prevTime = time

      if (elapsed < duration) {
        tick()
      }
    })
  }

  export function reset() {
    cancelAnimationFrame(frame)
    elapsed = 0
    tick()
  }

  onMount(() => {
    tick()
  })

  onDestroy(() => {
    if (frame) {
      cancelAnimationFrame(frame)
    }
  })
</script>

<label class="Timer">
  <span>Time to next update:</span>
  <progress value={elapsed / duration}>{Math.round((duration - elapsed) / 1000)} seconds</progress>
</label>

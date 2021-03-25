<script>
  import { onMount, onDestroy } from 'svelte'

  export let duration

  let nextFrame
  let prevTime
  let elapsedTime = 0

  function tick() {
    nextFrame = requestAnimationFrame(() => {
      prevTime = prevTime || window.performance.now()

      const time = window.performance.now()

      elapsedTime += time - prevTime
      prevTime = time

      if (elapsedTime < duration) {
        tick()
      }
    })
  }

  export function start() {
    elapsedTime = 0
    tick()
  }

  export function stop() {
    if (nextFrame) {
      cancelAnimationFrame(nextFrame)
    }
  }

  onMount(() => {
    start()
  })

  onDestroy(() => {
    stop()
  })
</script>

<label class="Timer">
  <span>Time to next update:</span>
  <progress value={elapsedTime / duration}
    >{Math.round((duration - elapsedTime) / 1000)} seconds</progress
  >
</label>

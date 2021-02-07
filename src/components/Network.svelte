<script>
  import NetworkLine from './NetworkLine.svelte'

  export let line
  export let station
  export let networkData

  const lineCodes = Object.keys(networkData.lines)
</script>

<div class="Network">
  {#each lineCodes as lineCode}
    <NetworkLine {networkData} {lineCode} {line} {station} />
  {/each}
  <button type="button" class="Network-toggle"> Toggle </button>
</div>

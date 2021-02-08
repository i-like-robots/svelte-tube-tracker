<script>
  import NetworkLine from './NetworkLine.svelte'

  export let line
  export let station
  export let networkData

  const lineCodes = Object.keys(networkData.lines)
</script>

<div class="Network">
  {#each lineCodes as lineCode}
    <NetworkLine on:station-select {line} {station} {networkData} {lineCode} />
  {/each}
  <!-- <button type="button" class="Network-toggle"> Toggle </button> -->
</div>

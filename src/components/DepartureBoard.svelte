<script>
  import DepartureBoardTrains from './DepartureBoardTrains.svelte'

  export let arrivalsData

  $: platforms = Object.entries(arrivalsData.platforms)
</script>

<div class="Departures">
  <h1 class="Departures-heading">
    {arrivalsData.station.stationName} Station,
    {arrivalsData.station.lineName} Line
  </h1>
  {#if platforms.length}
    {#each platforms as [name, trains]}
      <div class="Platform">
        <h2 class="Platform-heading">{name}</h2>
        <DepartureBoardTrains {trains} />
      </div>
    {/each}
  {:else}
    <p class="Departures-noData">No train arrivals due.</p>
  {/if}
</div>

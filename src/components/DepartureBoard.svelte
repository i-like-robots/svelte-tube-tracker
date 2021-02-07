<script>
  import DepartureBoardTrains from './DepartureBoardTrains.svelte'

  export let arrivalsData

  const platforms = Object.entries(arrivalsData.platforms)
</script>

<div class="Departures">
  <h1 class="Departures-heading">
    {arrivalsData.station.stationName} Station,
    {arrivalsData.station.lineName} Line
  </h1>
  {#each platforms as [name, trains]}
    <div class="Platform">
      <h2 class="Platform-heading">{name}</h2>
      <DepartureBoardTrains {trains} />
    </div>
  {/each}
</div>

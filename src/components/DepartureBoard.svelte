<script>
  import DepartureBoardTrains from './DepartureBoardTrains.svelte'

  export let predictionData

  const platforms = Object.entries(predictionData.platforms)
</script>

<div class="Departures">
  <h1 class="Departures-heading">
    {predictionData.station.stationName} Station,
    {predictionData.station.lineName} Line
  </h1>
  {#each platforms as [name, trains]}
    <div class="Platform">
      <h2 class="Platform-heading">{name}</h2>
      <DepartureBoardTrains {trains} />
    </div>
  {/each}
</div>

<script>
  import Network from './Network.svelte'
  import Predictions from './Predictions.svelte'

  export let networkData
  export let arrivalsData

  let line
  let station

  if (arrivalsData) {
    line = arrivalsData.request.lineCode
    station = arrivalsData.request.stationCode
  }
</script>

<div class="Layout">
  <div class="Layout-sidebar">
    <Network {line} {station} {networkData} />
  </div>
  <div class="Layout-content">
    <Predictions {line} {station} {networkData} {arrivalsData} />
  </div>
</div>

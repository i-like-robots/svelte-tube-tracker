<script>
  import Network from './Network.svelte'
  import Predictions from './Predictions.svelte'

  export let networkData
  export let initialData

  let line
  let station

  if (initialData) {
    line = initialData.request.lineCode
    station = initialData.request.stationCode
  }
</script>

<div class="Layout">
  <div class="Layout-sidebar">
    <Network {networkData} {line} {station} />
  </div>
  <div class="Layout-content">
    <Predictions {line} {station} {networkData} {initialData} />
  </div>
</div>

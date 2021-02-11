<script>
  import Network from './Network.svelte'
  import Predictions from './Predictions.svelte'

  export let networkData
  export let arrivalsData

  let line = arrivalsData?.request?.lineCode
  let station = arrivalsData?.request?.stationCode

  function handleStationSelect(e) {
    if (e.detail.line !== line || e.detail.station !== station) {
      // Update internal state
      line = e.detail.line
      station = e.detail.station

      // Update URL
      const queryString = new URLSearchParams({ line, station })
      window.history.pushState(null, null, `?${queryString}`)
    }
  }
</script>

<div class="Layout">
  <div class="Layout-predictions">
    <Predictions {line} {station} {arrivalsData} />
  </div>
  <div class="Layout-network">
    <Network {line} {station} {networkData} on:station-select={handleStationSelect} />
  </div>
</div>

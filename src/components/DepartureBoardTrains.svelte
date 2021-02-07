<script>
  export let trains

  function formatTimeToStation(timeTo) {
    const minutes = Math.round(timeTo / 60)
    const seconds = Math.round((timeTo - minutes * 60) / 30) * 30
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds > 0 ? seconds : '0'}`
  }
</script>

<table class="Trains">
  <thead>
    <tr>
      <th>Time</th>
      <th>Destination</th>
      <th>Line</th>
      <th>Current location</th>
    </tr>
  </thead>
  <tbody>
    {#each trains as train}
      <tr class="Trains-arrival">
        <td>{train.timeToStation < 30 ? '-' : formatTimeToStation(train.timeToStation)}</td>
        <td>{train.towards}</td>
        <td>{train.lineName}</td>
        <td>{train.currentLocation}</td>
      </tr>
    {/each}
  </tbody>
</table>

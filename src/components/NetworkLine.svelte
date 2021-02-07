<script>
  export let line
  export let station
  export let networkData
  export let lineCode

  const stationsOnLine = networkData.stationsOnLines[lineCode]
</script>

<form method="GET">
  <fieldset class={`Network-line Network-line--${lineCode}`}>
    <legend>{networkData.lines[lineCode]}</legend>
    <input type="hidden" name="line" value={lineCode} />
    <select name="station">
      {#each stationsOnLine as stationCode}
        <option value={stationCode} selected={line === lineCode && station == stationCode}>
          {networkData.stations[stationCode]}
        </option>
      {/each}
    </select>
    <button type="submit" title="View train times">Go</button>
  </fieldset>
</form>

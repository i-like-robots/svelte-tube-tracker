<script>
  import { createEventDispatcher } from 'svelte'

  export let line
  export let station
  export let lineCode
  export let networkData

  let stationCode

  const dispatch = createEventDispatcher()

  function handleSubmit() {
    dispatch('station-select', {
      line: lineCode,
      station: stationCode,
    })
  }
</script>

<form method="GET" on:submit|preventDefault={handleSubmit}>
  <fieldset class={`Network-line Network-line--${lineCode}`}>
    <legend>{networkData.lines[lineCode]}</legend>
    <input type="hidden" name="line" value={lineCode} />
    <select bind:value={stationCode} name="station">
      {#each networkData.stationsOnLines[lineCode] as stationCode}
        <option value={stationCode} selected={line === lineCode && station === stationCode}>
          {networkData.stations[stationCode]}
        </option>
      {/each}
    </select>
    <button type="submit" title="View train times">Go</button>
  </fieldset>
</form>

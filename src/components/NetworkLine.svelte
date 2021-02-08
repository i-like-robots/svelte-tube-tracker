<script>
  import { createEventDispatcher } from 'svelte'

  export let line
  export let station
  export let lineCode
  export let networkData

  const dispatch = createEventDispatcher()

  function handleSubmit(e) {
    const data = new FormData(e.target)

    dispatch('station-select', {
      line: data.get('line'),
      station: data.get('station'),
    })
  }
</script>

<form method="GET" on:submit|preventDefault={handleSubmit}>
  <fieldset class={`Network-line Network-line--${lineCode}`}>
    <legend>{networkData.lines[lineCode]}</legend>
    <input type="hidden" name="line" value={lineCode} />
    <select name="station">
      {#each networkData.stationsOnLines[lineCode] as stationCode}
        <option value={stationCode} selected={line === lineCode && station === stationCode}>
          {networkData.stations[stationCode]}
        </option>
      {/each}
    </select>
    <button type="submit" title="View train times">Go</button>
  </fieldset>
</form>

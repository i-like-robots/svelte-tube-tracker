<script>
  import Notice from './Notice.svelte'
  import DepartureBoard from './DepartureBoard.svelte'

  export let line
  export let station
  export let arrivalsData

  let status = arrivalsData ? 'success' : 'welcome'

  // Only trigger a data fetch when the line and/or station changes
  // and not on initial mount.
  function isInvalidData(newLine, newStation) {
    const currentLine = arrivalsData?.request?.lineCode
    const currentStation = arrivalsData?.request?.stationCode

    return newLine !== currentLine || newStation !== currentStation
  }

  async function fetchData(lineCode, stationCode) {
    const response = await fetch(`/api/${lineCode}/${stationCode}`)

    if (response.ok) {
      return response.json()
    } else {
      throw new Error(`Failed to fetch API data: "${response.status}"`)
    }
  }

  async function updateData(lineCode, stationCode) {
    status = 'loading'

    try {
      arrivalsData = await fetchData(lineCode, stationCode)
      status = 'success'
    } catch (error) {
      console.error(error)
      status = 'error'
    }
  }

  $: isInvalidData(line, station) && updateData(line, station)
</script>

{#if arrivalsData && status === 'success'}
  <DepartureBoard {arrivalsData} />
{:else}
  <Notice type={status} />
{/if}

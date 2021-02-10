<script>
  import { onDestroy, onMount } from 'svelte'
  import Notice from './Notice.svelte'
  import DepartureBoard from './DepartureBoard.svelte'

  export let line
  export let station
  export let arrivalsData

  let poller = null
  let status = arrivalsData ? 'success' : 'welcome'

  // Only trigger a data fetch when the line and/or station changes
  // and not on initial mount.
  function isInvalidData(newLine, newStation) {
    const currentLine = arrivalsData?.request?.lineCode
    const currentStation = arrivalsData?.request?.stationCode

    return newLine !== currentLine || newStation !== currentStation
  }

  async function fetchData() {
    const response = await fetch(`/api/${line}/${station}`)

    if (response.ok) {
      return response.json()
    } else {
      throw new Error(`Failed to fetch API data: "${response.status}"`)
    }
  }

  async function updateData() {
    clearInterval(poller)

    arrivalsData = null
    status = 'loading'

    try {
      arrivalsData = await fetchData()
      status = 'success'
    } catch (error) {
      console.error(error)
      status = 'error'
    }

    resetPoll()
  }

  async function refreshData() {
    try {
      arrivalsData = await fetchData()
    } catch (error) {
      console.error(error)
    }

    resetPoll()
  }

  function resetPoll() {
    clearInterval(poller)
    poller = setInterval(() => refreshData(), 1000 * 30)
  }

  onMount(() => {
    if (line && station) {
      resetPoll()
    }
  })

  onDestroy(() => {
    clearInterval(poller)
  })

  $: isInvalidData(line, station) && updateData(line, station)
</script>

{#if arrivalsData && status === 'success'}
  <DepartureBoard {arrivalsData} />
{:else}
  <Notice type={status} />
{/if}

<script>
  import { onDestroy, onMount } from 'svelte'
  import { Status } from '../constants'
  import Notice from './Notice.svelte'
  import DepartureBoard from './DepartureBoard.svelte'
  import DepartureTimer from './DepartureTimer.svelte'

  export let line
  export let station
  export let arrivalsData

  let timer
  let poller = null
  let status = arrivalsData ? Status.Success : Status.Welcome

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
    status = Status.Loading

    try {
      arrivalsData = await fetchData()
      status = Status.Success
    } catch (error) {
      console.error(error)
      status = Status.Error
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

    if (timer) {
      timer.reset()
    }
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

{#if arrivalsData && status === Status.Success}
  <DepartureBoard {arrivalsData} />
  <DepartureTimer bind:this={timer} duration={1000 * 30} />
{:else}
  <Notice type={status} />
{/if}

<script>
  import Notice from './Notice.svelte'
  import DepartureBoard from './DepartureBoard.svelte'

  export let arrivalsData

  let status = 'welcome'
</script>

{#if arrivalsData}
  <DepartureBoard {arrivalsData} />
{:else}
  <Notice type={status} />
{/if}

<script>
  import { Status } from '../constants'

  export let type

  const statusToClass = {
    [Status.Error]: 'error',
    [Status.Loading]: 'loading',
    [Status.Welcome]: 'welcome',
  }

  const statusToText = {
    [Status.Error]: 'Sorry an error occurred, please try again.',
    [Status.Loading]: 'Loading predictions…',
    [Status.Welcome]: 'Please choose a station.',
  }
</script>

<div class={`Notice Notice--${statusToClass[type]}`}>
  <p>{statusToText[type]}</p>
</div>

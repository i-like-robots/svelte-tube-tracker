<script>
  export let type

  function statusText(status) {
    let text

    switch (status) {
      case 'error':
        text = 'Sorry an error occurred, please try again.'
        break
      case 'loading':
        text = 'Loading predictions…'
        break
      case 'welcome':
        text = 'Please choose a station.'
        break
    }

    return text
  }
</script>

<div class={`Notice Notice--${type}`}>
  <p>{statusText(type)}</p>
</div>

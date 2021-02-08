import App from '../components/App.svelte'

let initialData

try {
  initialData = JSON.parse(document.getElementById('initialData').innerHTML)
} catch (error) {
  console.error('Failed to parse initial data', error)
}

new App({
  target: document.getElementById('app'),
  props: {
    ...initialData,
  },
})

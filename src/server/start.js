require('svelte/register')({
  hydratable: true,
})

const app = require('./app.js')

const PORT = process.env.PORT || 3456

app.listen(PORT, (error) => {
  if (error) {
    console.error('App failed to start', error)
    process.exit(1)
  } else {
    console.log(`App is listening on http://localhost:${PORT}`)
  }
})

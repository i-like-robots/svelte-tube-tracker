require('svelte/register')({
  hydratable: true,
})

const { arrivals } = require('../src/server/lib/apiClient')
const networkData = require('../src/server/lib/networkData.json')
const App = require('../src/components/App.svelte').default

async function homeFn(request, response) {
  try {
    const { line, station } = request.query

    let arrivalsData = null

    if (line && station) {
      arrivalsData = await arrivals(line, station)
    }

    const app = App.render({ networkData, arrivalsData })

    response.setHeader('Cache-Control', 'max-age=30, must-revalidate')

    response.send(`<!DOCTYPE html>
      <html lang="en-GB">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>TfL London Underground Arrivals</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <div id="app">${app.html}</div>
          <script type="application/json" id="initialData">
            ${JSON.stringify({ networkData, arrivalsData })}
          </script>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `)
  } catch (error) {
    response.status(error.status || 500)
    response.end(`Oh no, something went wrong! ${error.message}`)
    console.error(error)
  }
}

module.exports = homeFn

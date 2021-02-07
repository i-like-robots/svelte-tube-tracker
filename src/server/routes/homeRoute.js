const { arrivals } = require('../lib/apiClient')
const networkData = require('../../common/networkData.json')
const App = require('../../components/App.svelte').default

async function homeRoute(request, response) {
  try {
    const { line, station } = request.query

    let initialData = null

    if (line && station) {
      initialData = await arrivals(line, station)
    }

    const app = App.render({ networkData, initialData }).html

    response.writeHead(200, {
      'Cache-Control': 'max-age=30, must-revalidate',
      'Content-Type': 'text/html; charset=UTF-8',
    })

    response.end(`<!DOCTYPE html>
      <html lang="en-GB">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>TfL London Underground Arrivals</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <div id="app">${app}</div>
          <script type="application/json" id="initialData">
            ${JSON.stringify(initialData)}
          </script>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `)
  } catch (error) {
    console.error(error)
    response.statusCode = error.status || 500
    response.end(`Oh no, something went wrong! ${error.message}`)
  }
}

module.exports = homeRoute

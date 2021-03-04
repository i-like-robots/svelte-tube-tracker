import { arrivals } from '../server/apiClient'
import networkData from '../server/networkData.json'
import App from '../components/App.svelte'

export default async function homeFn(request, response) {
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
          <link rel="preload" href="/font.css" as="style">
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <div id="app">${app.html}</div>
          <script type="application/json" id="initialData">
            ${JSON.stringify({ networkData, arrivalsData })}
          </script>
          <script src="/build/app.js"></script>
        </body>
      </html>
    `)
  } catch (error) {
    response.status(error.status || 500)
    response.end(`Oh no, something went wrong! ${error.message}`)
    console.error(error)
  }
}

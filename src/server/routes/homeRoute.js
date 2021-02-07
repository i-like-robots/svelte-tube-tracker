const { arrivals } = require('../lib/apiClient')
const homeView = require('../views/homeView')
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
    const html = homeView({ app, initialData })

    response.writeHead(200, {
      'Cache-Control': 'max-age=30, must-revalidate',
      'Content-Type': 'text/html; charset=UTF-8',
    })

    response.end(html)
  } catch (error) {
    console.error(error)
    response.statusCode = error.status || 500
    response.end(`Oh no, something went wrong! ${error.message}`)
  }
}

module.exports = homeRoute

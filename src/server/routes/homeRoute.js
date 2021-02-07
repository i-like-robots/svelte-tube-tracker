const { arrivals } = require('../lib/apiClient')
const homeView = require('../views/homeView')

async function homeRoute(request, response) {
  try {
    const { line, station } = request.query

    let initialData = null

    if (line && station) {
      initialData = await arrivals(line, station)
    }

    const body = 'Hello, World'

    response.writeHead(200, {
      'Cache-Control': 'max-age=30, must-revalidate',
      'Content-Type': 'text/html; charset=UTF-8',
    })

    response.end(homeView({ body, initialData }))
  } catch (error) {
    console.error(error)
    response.statusCode = error.status || 500
    response.end(`Oh no, something went wrong! ${error.message}`)
  }
}

module.exports = homeRoute

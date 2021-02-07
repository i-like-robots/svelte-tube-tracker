const { arrivals } = require('../lib/apiClient')

async function apiRoute(request, response) {
  try {
    const data = await arrivals(request.params.line, request.params.station)

    response.writeHead(200, {
      'Cache-Control': 'max-age=30, must-revalidate',
      'Content-Type': 'application/json',
    })

    response.end(JSON.stringify(data))
  } catch (error) {
    console.error(error)
    response.statusCode = error.status || 500
    response.end(`Oh no, something went wrong! ${error.message}`)
  }
}

module.exports = apiRoute

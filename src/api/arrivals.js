const { arrivals } = require('../server/apiClient')

async function arrivalsFn(request, response) {
  try {
    const data = await arrivals(request.query.line, request.query.station)

    response.setHeader('Cache-Control', 'max-age=30, must-revalidate')
    response.json(data)
  } catch (error) {
    response.status(error.status || 500)
    response.send(`Oh no, something went wrong! ${error.message}`)
    console.error(error)
  }
}

module.exports = arrivalsFn

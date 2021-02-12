const createHttpError = require('http-errors')
const { httpRequest } = require('./httpRequest')
const networkData = require('./networkData.json')
const { isStationOnLine, mergeGroupedLines } = require('./networkDataUtils')

function request(pathname, params = {}) {
  const query = new URLSearchParams({
    ...params,
    // app_id: process.env.APP_ID,
    app_key: process.env.APP_KEY,
  })

  const url = new URL(process.env.API_HOST)

  url.pathname = pathname
  url.search = query.toString()

  return httpRequest(url.toString())
}

async function arrivals(lineCode, stationCode) {
  if (!isStationOnLine(lineCode, stationCode, networkData)) {
    throw createHttpError(400, 'Invalid station and/or line combination')
  }

  // Fetch all lines which share the same platform
  const lineCodes = mergeGroupedLines(lineCode, stationCode, networkData)

  const requestPath = `/Line/${lineCodes.join(',')}/Arrivals`

  const arrivals = await request(requestPath, { stopPointId: stationCode })

  arrivals.sort((a, b) => a.timeToStation - b.timeToStation)

  const platforms = {}

  arrivals.forEach((arrival) => {
    // platforms[record.platformName] ??= []
    platforms[arrival.platformName] = platforms[arrival.platformName] || []
    platforms[arrival.platformName].push(arrival)
  })

  return {
    request: {
      lineCode,
      stationCode,
    },
    station: {
      lineName: networkData.lines[lineCode],
      stationName: networkData.stations[stationCode],
    },
    platforms,
  }
}

module.exports = { request, arrivals }

import createHttpError from 'http-errors'
import { httpRequest } from './httpRequest'
import networkData from './networkData.json'
import { isStationOnLine, mergeGroupedLines } from './networkDataUtils'

export function request(pathname, params = {}) {
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

export async function arrivals(lineCode, stationCode) {
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
    // TODO: use nullish coalescing when available
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

const fetch = require('node-fetch')
const createError = require('http-errors')

const DEFAULTS = {
  timeout: 3000,
}

/**
 * Make HTTP request
 * @param {String} url
 * @param {import('node-fetch').RequestInit} [init={}]
 * @returns {Promise<any>}
 * @throws {HTTPError} Will throw an HTTP error for non-200 responses
 */
async function httpRequest(url, init = {}) {
  const response = await fetch(url, { ...DEFAULTS, ...init })

  const contentType = response.headers.get('Content-Type')

  let result

  // This is probably not necessary for a tech test...
  if (contentType?.includes('application/json')) {
    result = await response.json()
  } else {
    result = await response.text()
  }

  if (response.ok) {
    return result
  } else {
    throw createError(response.status, {
      details: result,
    })
  }
}

module.exports = { httpRequest }

import fetch from 'node-fetch'
import createError from 'http-errors'

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
export async function httpRequest(url, init = {}) {
  const response = await fetch(url, { ...DEFAULTS, ...init })

  const contentType = response.headers.get('Content-Type')

  let result

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

const originalFetch = require('isomorphic-fetch')
const fetch = require('fetch-retry')(originalFetch, {
  retryDelay: 800,
  retryOn: function (attempt, error, response) {
    // only retry 5 times
    if (attempt === 5) {
      return false
    }

    // retry on any network error, or 4xx or 5xx status codes
    if (error !== null || response.status >= 400) {
      console.log(`retrying, attempt number ${attempt + 1}`)
      return true
    }
  }
})

export async function doRequest (...opts) {
  const response = await fetch(...opts)

  return response.json()
}

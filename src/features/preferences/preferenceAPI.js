import { doRequest } from '../../helpers/request'

export function getPref (url = `${process.env.REACT_APP_URL}/preferences/cities?limit=100`) {
  return doRequest(url)
}

export function pathPref (body) {
  return doRequest(`${process.env.REACT_APP_URL}/preferences/cities`,
    {
      body: JSON.stringify(body),
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
}

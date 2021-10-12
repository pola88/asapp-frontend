import { doRequest } from '../../helpers/request'

export function getAll (url = `${process.env.REACT_APP_URL}/cities?limit=100`) {
  return doRequest(url)
}

export function search (value = '') {
  return doRequest(`${process.env.REACT_APP_URL}/cities?limit=100&filter=${value}`)
}

export function getById (cityId) {
  return doRequest(`${process.env.REACT_APP_URL}/cities/${cityId}`)
}

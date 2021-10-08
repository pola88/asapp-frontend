import { doRequest } from "../../helpers/request";

export function getAll(url = `${process.env.REACT_APP_URL}/cities?limit=10`) {
  return doRequest(url);
}

export function search(value = '') {
  return doRequest(`${process.env.REACT_APP_URL}/cities?limit=10&filter=${value}`);
}
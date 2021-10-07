
export function getAll(limit = 10) {
  return fetch(`${process.env.REACT_APP_URL}/cities?limit=${limit}`)
          .then( response => response.json());
}

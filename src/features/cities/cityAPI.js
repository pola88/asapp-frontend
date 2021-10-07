
export function getAll(url = `${process.env.REACT_APP_URL}/cities?limit=10`) {
  return fetch(url)
          .then( response => response.json());
}

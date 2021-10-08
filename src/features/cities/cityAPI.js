
export function getAll(url = `${process.env.REACT_APP_URL}/cities?limit=10`) {
  return fetch(url)
          .then( response => response.json());
}

export function search(value = '') {
  return fetch(`${process.env.REACT_APP_URL}/cities?limit=10&filter=${value}`)
    .then(response => response.json());
}
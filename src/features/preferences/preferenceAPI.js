
export function getPref(url = `${process.env.REACT_APP_URL}/cities?limit=10`) {
  return fetch(url)
    .then(response => response.json());
}

export function pathPref(body) {
  return fetch(`${process.env.REACT_APP_URL}/preferences/cities`,
    {
      body: JSON.stringify(body),
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
  );
}
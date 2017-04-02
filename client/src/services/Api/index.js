import fetch from 'isomorphic-fetch';

export const headers = () => {
  
  const token = JSON.parse(localStorage.getItem('token'));
  
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer: ${token}`,
  }
}

export const parseResponse = (response) => {
  return response.json()
    .then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    });
}

export const queryString = (params: Object) => {
  const query: string = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');

  return `${query.length ? '?' : ''}${query}`;
}

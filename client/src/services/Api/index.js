import fetch from 'isomorphic-fetch';

const API = process.env.REACT_APP_API_URL;

export const headers = () => {
  
  const token = localStorage.getItem('token');

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
        console.log(json.errors)
        return Promise.reject(json.errors);
      }

      return json;
    });
}

export const queryString = (params) => {
  const query = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');

  return `${query.length ? '?' : ''}${query}`;
}

export default {

  get(url, params = {}) {
    return fetch(`${API}${url}${queryString(params)}`, {
      method: 'GET', 
      headers: headers(),
    })
    .then(parseResponse)
  },
  
  post(url, data = {}) {
    const body = JSON.stringify(data);
    return fetch(`${API}${url}`, {
      method: 'POST',
      headers: headers(),
      body,
    })
    .then(parseResponse)
  },

  patch(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${API}${url}`, {
      method: 'PATCH', 
      headers: headers(),
      body,
    })
    .then(parseResponse)
  }, 

  delete(url) {
    return fetch(`${API}${url}`, {
      method: 'DELETE', 
      headers: headers(),
    })
    .then(parseResponse)
  }
}
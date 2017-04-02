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

export default {

  fetch(url: string, params: Object = {}) {
    return fetch(`${API}${url}${queryString(params)}`, {
        method: 'GET', 
        headers: headers(),
      })
      .then(parseResponse)
      .catch(console.log);
  },
  
  post(url: string, data: Object = {}) {
    const body: string = JSON.stringify(data);

    return fetch(`${API}${url}`, {
      method: 'POST',
      headers: headers(),
      body,
    })
    .then(parseResponse)
    .catch(console.log);
  },

  patch(url: string, data: Object) {
    const body: string = JSON.stringify(data);

    return fetch(`${API}${url}`, {
      method: 'PATCH', 
      headers: headers(),
      body,
    })
    .then(parseResponse)
    .catch(console.log);
  }, 

  delete(url: string) {
    return fetch(`${API}${url}`, {
      method: 'DELETE', 
      headers: headers(),
    })
    .then(parseResponse)
    .catch(console.log);
  }
}
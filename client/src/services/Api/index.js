import fetch from 'isomorphic-fetch';
import { SubmissionError } from 'redux-form';

const API = process.env.REACT_APP_API_URL;

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
      .catch(err => {
        throw new SubmissionError(err)
      });
  },
  
  post(url, data = {}) {
    const body = JSON.stringify(data);
    return fetch(`${API}${url}`, {
      method: 'POST',
      headers: headers(),
      body,
    })
    .then(parseResponse)
    .catch(err => {
      throw new SubmissionError(err)
    });
  },

  patch(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${API}${url}`, {
      method: 'PATCH', 
      headers: headers(),
      body,
    })
    .then(parseResponse)
    .catch(err => {
      throw new SubmissionError(err)
    });
  }, 

  delete(url) {
    return fetch(`${API}${url}`, {
      method: 'DELETE', 
      headers: headers(),
    })
    .then(parseResponse)
    .catch(err => {
      throw new SubmissionError(err)
    });
  }
}
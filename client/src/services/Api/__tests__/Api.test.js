import {
  headers,
  parseResponse
} from '../../Api';
import fetch from 'isomorphic-fetch';
import nock from 'nock';

global.window = document.defaultView;
window.localStorage = (() => {
  let store = {};
  return {
    getItem(key: string) {
      return store[key]
    },
    setItem(key: string, value: string) {
      store[key] = value.toString()
    },
    clear() {
      store = {}
    },
  };
})()

const api = nock('http://localhost:3001')
              .get('/api')
              .reply(200, { id: 123 })

describe('Api Service', () => {

  describe('headers()', () => {

    it('should return a Headers object with the JWT token', () => {
      localStorage.setItem('token', JSON.stringify('abc.123.def.456'))
      expect(headers()).toEqual({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer: abc.123.def.456',
      })
    })
  })

  describe('parseResponse(response)', () => {

    it('should parse the HTTP rsponse into json', async function() {
      const response = await fetch('http://localhost:3001/api');
      const parsedResponse = await parseResponse(response);
      expect(parsedResponse).toEqual({ id: 123 })
    })
  })
})


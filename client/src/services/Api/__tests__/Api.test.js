import {
  headers
} from '../../Api';
import fetch from 'isomorphic-fetch';

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
})(0)

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
})


import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../actions';

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

const middlewares = [ thunk ]; 
const mockStore = configureMockStore(middlewares);
const router = {
  history: {
    replace: jest.fn()
  }
}

describe('Auth Module action creators', () => {

  describe('authenticationRequest()', () => {

    it('creates an action to authenticate request', () => {
      expect(actions.authenticationRequest()).toEqual({ type: 'AUTHENTICATION_REQUEST' });
    })
  })

  describe('setCurrentUser(user)', () => {

    it('creates an action to set current user', () => {
      expect(actions.setCurrentUser({ username: 'billy' })).toEqual({ type: 'AUTHENTICATION_SUCCESS', user: { username: 'billy' }});
    })
  })
  
})

describe('Auth Module async actions', () => {
  let initialState;
  let response;
  let user;

  beforeEach(() => {
    initialState = {
      auth: {
        isAuthenticated: false,
        isAuthenticating: true, 
        currentUser: {}
      }
    };
    user = { 
      id: 1,
      first_name: 'Bill',
      last_name: 'Murray',
      email: 'bill@gmail.com',
    }
    response = {
      user,
      token: 'abc.123.def.456',
    }
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('creates an AUTHENTICATION_REQUEST and an AUTHENTICATION_SUCCESS when creating a user', () => {

    nock('http://localhost:3001/api')
      .post('/users')
      .reply(200, response)

    const store = mockStore(initialState);
    
    return store.dispatch(actions.signup({
      user: {
        first_name: 'Bill',
        last_name: 'Murray',
        username: 'billy', 
        email: 'bill@gmail.com',
        password: 'password'
      }
    }, router))
      .then(() => expect(store.getActions()).toEqual([
        { type: 'AUTHENTICATION_REQUEST' },
        { type: 'AUTHENTICATION_SUCCESS', user },
        { meta: { form: "signup" }, type: "@@redux-form/RESET" }
      ]));
  })
})
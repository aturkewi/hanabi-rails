import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../actions';

global.window = document.defaultView;
window.localStorage = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key]
    },
    setItem(key, value) {
      store[key] = JSON.stringify(value.toString())
    },
    removeItem(key) {
      store[key] = null;
    },
    clear() {
      store = {}
    },
  };
})()

const middlewares = [ thunk ]; 
const mockStore = configureMockStore(middlewares);

describe('Auth Module action creators', () => {

  describe('setGames(games)', () => {

    it('creates an action to pass an array of games to replace the games reducer state', () => {
      const games = [{ title: 'game 1' }, { title: 'game 2' }];

      expect(actions.setGames(games)).toEqual({ 
        type: 'SET_GAMES',
        games
      });
    })
  })

  describe('addGame(game)', () => {

    it('creates an action to add a game to the games reducer state', () => {
      const game = { title: 'game 1' };

      expect(actions.addGame(game)).toEqual({ 
        type: 'ADD_GAME', 
        game
      });
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

})

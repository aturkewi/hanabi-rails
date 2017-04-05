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

  describe('fetchingGames()', () => {
    
    it('creates an action to pass "FETCHING_GAMES" to the reducer', () => {
      expect(actions.fetchingGames()).toEqual({ 
        type: 'FETCHING_GAMES'
      });
    })
  })

  describe('fetchingGamesFailure()', () => {
    
    it('creates an action to pass "FETCHING_GAMES_FAILURE" to the reducer', () => {
      expect(actions.fetchingGamesFailure()).toEqual({ 
        type: 'FETCHING_GAMES_FAILURE'
      });
    })
  })

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
  let games;
  let response;

  beforeEach(() => {
    initialState = {
      games: []
    };
    games: [
      { title: 'game 1' }, 
      { title: 'game 2' }
    ];
    response = {
      games
    };
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('fetchGames()', () => {

    it('creates actions for REQUESTING_GAMES and SET_GAMES while fetching', () => {
      nock('http://localhost:3001/api')
        .get('/games')
        .reply(200, response)

      const store = mockStore(initialState);

      return store.dispatch(actions.fetchGames())
        .then(() => expect(store.getActions()).toEqual([
          { type: 'FETCHING_GAMES' },
          { type: 'SET_GAMES', games }
        ]));
    })
  })

})

import * as actions from '../actions';


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

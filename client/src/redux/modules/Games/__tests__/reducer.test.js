import reducer from '../reducer';

const initialState = [];

describe('Auth Module Reducer', () => {

  it('returns the intitial state by default', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('handles SET_GAMES', () => {
    const games = [{ title: 'game 1' }, { title: 'game 2' }];
    
    expect(reducer(initialState, { 
      type: 'SET_GAMES', games
    })).toEqual(games);
  })

  it('handles ADD_GAME', () => {
    const games = [{ title: 'game 1' }, { title: 'game 2' }];
    const game = { title: 'game 3' };
    
    expect(reducer(games, {
      type: 'ADD_GAME',
      game
    })).toEqual([
      { title: 'game 1' }, 
      { title: 'game 2' },
      { title: 'game 3' }
    ]);
  })
})
import reducer from '../reducer';

const initialState = {}

describe('GamesSubscription Module Reducer', () => {

  it('returns the intial state by default', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
})
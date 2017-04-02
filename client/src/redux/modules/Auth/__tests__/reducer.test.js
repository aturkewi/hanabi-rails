import reducer from '../reducer';

describe('Auth Module Reducer', () => {

  it('should return the intitial state by default', () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthenticated: false,
      willAuthenticate: true,
      currentUser: {},
    })
  })
})
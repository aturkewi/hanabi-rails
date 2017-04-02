import reducer from '../reducer';

describe('Auth Module Reducer', () => {

  it('returns the intitial state by default', () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthenticated: false,
      isAuthenticating: true,
      currentUser: {},
    })
  })

  it('handles an AUTHENTICATION_REQUEST', () => {
    expect(reducer(undefined, { type: 'AUTHENTICATION_REQUEST' })).toEqual({
      isAuthenticated: false,
      isAuthenticating: true,
      currentUser: {},
    })
  })
})
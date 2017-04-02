import reducer from '../reducer';

const user = {
  first_name: "Bill",
  last_name: "Murray", 
  username: "billy",
  email: "bill@gmail.com"
}

describe('Auth Module Reducer', () => {

  it('returns the intitial state by default', () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthenticated: false,
      isAuthenticating: true,
      currentUser: {}
    })
  })

  it('handles AUTHENTICATION_REQUEST', () => {
    expect(reducer(undefined, { type: 'AUTHENTICATION_REQUEST' })).toEqual({
      isAuthenticated: false,
      isAuthenticating: true,
      currentUser: {}
    })
  })

  it('handles AUTHENTICATION_SUCCESS', () => {
    expect(reducer(undefined, {
      type: 'AUTHENTICATION_SUCCESS',
      user
    })).toEqual({
      isAuthenticated: true,
      isAuthenticating: false, 
      currentUser: user
    })
  })

  it('handles AUTHENTICATION_FAILURE', () => {
    expect(reducer(undefined, { type: 'AUTHENTICATION_FAILURE' })).toEqual({
      isAuthenticated: false,
      isAuthenticating: false,
      currentUser: {}
    })
  })

  it('handles LOGOUT', () => {
    expect(reducer({
      currentUser: user, 
      isAuthenticating: false, 
      isAuthenticated: true
    }, { type: 'LOGOUT' })).toEqual({
      isAuthenticated: false,
      isAuthenticating: false,
      currentUser: {}
    })
  })
})
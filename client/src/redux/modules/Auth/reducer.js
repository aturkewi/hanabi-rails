const initialState = {
  isAuthenticated: false, 
  isAuthenticating: true, 
  currentUser: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    
    case 'AUTHENTICATION_REQUEST':
      return {
        ...state,
        isAuthenticating: true,
      }

    default:
      return state;
  }
}
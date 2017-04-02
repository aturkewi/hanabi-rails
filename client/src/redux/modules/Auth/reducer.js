const initialState = {
  isAuthenticated: false, 
  willAuthenticate: true, 
  currentUser: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}
const initialState = {
  creating: false,
  active: false
}

export default (state = initialState, action) => {
  switch(action.type) {

    case 'CREATING_SUBSCRIPTION':
      return {
        creating: true,
        active: false
      };

    case 'ACTIVATE_SUBSCRIPTION': 
      return {
        creating: false,
        active: true
      }
    
    default: 
      return state;
  }
} 
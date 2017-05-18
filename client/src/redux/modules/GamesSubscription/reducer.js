const initialState = {
  creatingSubscription: false,
  activeSubscription: false
}

export default (state = initialState, action) => {
  switch(action.type) {

    case 'CREATING_SUBSCRIPTION':
      return {
        creatingSubscription: true,
        activeSubscription: false
      };

    case 'ACTIVATE_SUBSCRIPTION': 
      return {
        creatingSubscription: false,
        activeSubscription: true
      }
    
    default: 
      return state;
  }
} 
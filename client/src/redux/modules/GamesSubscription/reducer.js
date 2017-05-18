export default (state = {}, action) => {
  switch(action.type) {

    case 'SET_SUBSCRIPTION_FUNCTIONS':
      return action.subscriptionFunctions
    
    default: 
      return state;
  }
} 
const initialState = {
  list: [],
  status: ''
}

export default (state = initialState, action) => {

  switch(action.type) {

    case 'FETCHING_GAMES':
      return { 
        ...state,
        status: 'Fetching games' 
      };

    case 'FETCH_GAMES_FAILURE':
      return { 
        ...state,
        status: 'Failure fetching games'
      };

    case 'SET_GAMES':
      return {
        ...state, 
        list: action.games
      };

    case 'ADD_GAME':
      return {
        ...state,
        list: state.list.concat(action.game)
      };

    default: 
      return state;
  }
}
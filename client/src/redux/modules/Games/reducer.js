const initialState = {
  list: [],
  status: 'Fetching Games'
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
        status: 'Failure Fetching Games'
      };

    case 'SET_GAMES':
      return {
        status: "Games Loaded", 
        list: action.games
      };

    default: 
      return state;
  }
}
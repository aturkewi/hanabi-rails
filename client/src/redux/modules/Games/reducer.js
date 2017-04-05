export default (state = [], action) => {

  switch(action.type) {

    case 'FETCHING_GAMES':
      return { status: 'Fetching games' };

    case 'FETCH_GAMES_FAILURE':
      return { status: 'Failure fetching games' };

    case 'SET_GAMES':
      return action.games;

    case 'ADD_GAME':
      return [
        ...state, 
        action.game
      ];

    default: 
      return state;
  }
}
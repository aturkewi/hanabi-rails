/**
 * @param {Games} creator actions
 */

export const fetchingGames = () => {
  return { type: 'FETCHING_GAMES' }
};

export const fetchingGamesFailure = () => {
  return { type: 'FETCHING_GAMES_FAILURE' }
};

export const setGames = games => {
  return {
    type: 'SET_GAMES', 
    games
  }
}

export const addGame = game => {
  return {
    type: 'ADD_GAME',
    game
  }
}
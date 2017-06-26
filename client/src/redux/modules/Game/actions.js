export const fetchingGame = () => {
  return { type: 'FETCHING_GAME' }
};

export const fetchingGameFailure = () => {
  return { type: 'FETCHING_GAME_FAILURE' }
};

export const setGame = game => {
  return {
    type: 'SET_GAME', 
    game
  }
}
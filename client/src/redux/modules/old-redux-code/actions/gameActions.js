import GameService from '../services/gameService';

const loadGameSuccess = (game) => {
  return {
    type: "LOAD_GAME_SUCCESS",
    game
  }
}

export const loadGame = (gameId) => {
  return dispatch => {
    return GameService.show(gameId)
      .then(data => dispatch(loadGameSuccess(data)))
      .catch(err => console.log(err));
  }
}
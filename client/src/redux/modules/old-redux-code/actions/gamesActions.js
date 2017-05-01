import GameService from '../services/gameService';

const createGameSuccess = (game) => {
  return {
    type: 'CREATE_GAME_SUCCESS',
    game
  }
}

export const createGame = (title) => {
  return dispatch => {
    return GameService.create(title)
      .then(data => dispatch(createGameSuccess(data)))
      .catch(err => console.log(err));
  }
};

const loadGamesSuccess = (games) => {
  return {
    type: "ADD_GAMES",
    games
  }
}

export const loadGames = () => {
  return dispatch => {
    return GameService.index()
      .then(data => dispatch(loadGamesSuccess(data)))
      .catch(err => console.log(err));
  }
}
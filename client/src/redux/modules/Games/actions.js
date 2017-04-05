import { reset, SubmissionError } from 'redux-form';
import ApiService from '../../../services/Api';

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

/**
 * @param {Auth} async actions
 */

export const signup = (user, router) => {
  return dispatch => {
    dispatch(authenticationRequest());
    return ApiService.post('/users', user)
      .then(response => {
        const { user, token } = response;
        localStorage.setItem('token', token);
        dispatch(setCurrentUser(user));
        dispatch(reset('signup'));
        router.history.replace('/games');
      })
      .catch((err) => {
        throw new SubmissionError(err)
      })
  }
}

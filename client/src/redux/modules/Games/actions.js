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
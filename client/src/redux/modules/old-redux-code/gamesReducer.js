export default (state = [], action) => {
  switch(action.type){
    case "CREATE_GAME_SUCCESS":
      return [...state, action.game];
    case "ADD_GAMES":
      return action.games
    default:
      return state;
  }
}

import { initialDeck } from '../lib/initialDeck';
const freshGame = {
  deck: initialDeck,
  discard: [],
  played: [],
  players: [],
  clueCounter: 8,
  missesRemaining: 3,
  currentPlayerId: 0
}

export default (state = {
  id: null,
  deck: initialDeck, 
  discard: [], 
  played: [],
  hands: [],
  clueCounter: 8,
  missesRemaining: 3,
  currentPlayerId: null,
}, action) => {
  switch(action.type) {

    case "RESET_GAME":
      return freshGame;

    case "LOAD_GAME_SUCCESS":
      return action.game;

    case "ADD_PLAYER":
      const newPlayer = { name: action.playerName, hand:[], id: state.players.length }
      return Object.assign({}, state, {
        players: [...state.players, newPlayer]
      })

    case "START_GAME":
      let { players, deck } = action
      return Object.assign({}, state, { players, deck })

    case "DISCARD_CARD":
      let discard = [...state.discard, action.discardedCard]
      players = state.players.slice()
      players[action.player.id] = action.player
      return Object.assign({}, state, { 
        players, 
        deck: action.deck,
        discard,
        clueCounter: action.clueCounter,
        currentPlayerId: action.currentPlayerId
      })

    case "PLAY_CARD":
      players = state.players.slice();
      players[action.player.id] = action.player
      let played = [...state.played, action.playedCard]
      return Object.assign({}, state, {
        players,
        played,
        deck: action.deck,
        currentPlayerId: action.currentPlayerId
      })

    case "MISPLAY_CARD":
      players = state.players.slice();
      players[action.player.id] = action.player
      discard = [...state.discard, action.playedCard]
      return Object.assign({}, state, {
        players,
        discard,
        deck: action.deck,
        missesRemaining: action.missesRemaining,
        currentPlayerId: action.currentPlayerId
      })

    case "GIVE_CLUE":
      players = state.players.slice();
      players[action.player.id] = action.player;
      return Object.assign({}, state, {
        players,
        currentPlayerId: action.currentPlayerId,
        clueCounter: action.clueCounter
      })

    default:
      return state;

  }
};

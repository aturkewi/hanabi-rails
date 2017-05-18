import reducer from '../reducer';

const initialState = {}

const subscriptionFunctions = {
    connected() { 
      console.log('connected: action cable')
    },
    received(data) {
      if (data.games) {
        var games = JSON.parse(data.games).games
      } else if (data.game) {
        console.log(JSON.parse(data.game))
      } else if (data.errors) {
        console.log(JSON.parse(data.errors))
      }
    },
    createGame(title) {
      return this.perform('create_game', { title: title });
    },
    getGames() {
      return this.perform('get_games', null);
    },
    disconnected() { 
      console.log("disconnected: action cable" )
    }
}

describe('GamesSubscription Module Reducer', () => {

  it('returns the intial state by default', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('returns the cable subscription methods for action type "SET_SUBSCRIPTION_FUNCTIONS"', () => {
    const activeSubscriptionState = {
      creatingSubscription: false,
      activeSubscription: true
    }
    expect(reducer(activeSubscriptionState, {
      type: 'SET_SUBSCRIPTION_FUNCTIONS',
      subscriptionFunctions
    })).toEqual(subscriptionFunctions)
  })
})
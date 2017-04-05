import React, { Component } from 'react';
import ActionCable from 'actioncable';
const token = localStorage.token
const App = {};
App.cable = ActionCable.createConsumer(`ws://localhost:3001/cable?token=${token}`);

class Games extends Component { 

  constructor() {
    super()
    this.state = {
      games: [],
    }
  }

  componentDidMount() {
    this.setupSubscription()
  }

  setupSubscription() {
    App.games = App.cable.subscriptions.create('GameChannel', {

      connected() { 
        setTimeout(() => this.perform('follow', { game_id: 1 }), 1000);
      },

      received(data) {
        this.updateGamesList(data);
      },

      disconnected() { 
        console.log("disconnected: action cable" )
      },
      updateGametList: this.updateGamesList.bind(this)

    })
  }

  updateGamesList(data) {
    debugger;
    console.log(data);
  }

  componentWillUnmount() {
    this.subscription && App.cable.subscriptions.remove(this.subscription)
  }

  render() {
    const games = this.state.games.map(game => <h1>{game.title}</h1>);
    return(
      <div>
        <h1>Games Channel</h1>
        {games}
      </div>
    )
  }
}

export default Games;
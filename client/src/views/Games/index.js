import React, { Component } from 'react';
import ActionCable from 'actioncable';
const token = localStorage.token;
let App = {};
App.cable = ActionCable.createConsumer(`ws://localhost:3001/cable?token=${token}`);
App.game = App.cable.subscriptions.create('GameChannel', {

  connected() { 
    setTimeout(() => this.perform('get_games', null), 1000)
    // console.log('connected: action cable')
  },
  
  received(data) {
    console.log('I have received the data')
    console.log(data)
  },

  speak(title) {
    return this.perform('speak', { title: title });
  },

  getGames() {
    return this.perform('get_games', null);
  },

  disconnected() { 
    console.log("disconnected: action cable" )
  }

});

class Game extends Component {

  constructor() {
    super()
    this.state = {
      inputValue: ''
    }
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    this.props.createGame(this.state.inputValue)
    this.setState({
      inputValue: ''
    })
  }

  handleOnChange(event) {
    this.setState({
      inputValue: event.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}> 
        <input onChange={(event) => this.handleOnChange(event)} value={this.state.inputValue} />
      </form>
    )
      
  }

}
  

class Games extends Component { 

  // componentWillMount() {

  //   if (typeof App !== 'undefined') {
      
  //   }
  // }

  // componentWillUnmount() {
  //   App.cable.subscriptions.remove(this.subscription)
  // }

  createGame = (title) => App.game.speak(title);
  
  getGames = () => App.game.getGames();

  render() {
    return(
      <div>
        <button onClick={this.getGames}>Get Games</button>
        <h1>Games Channel</h1>
         <Game createGame={this.createGame} />
      </div>
    )
  }
}

export default Games;


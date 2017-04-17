import React, { Component } from 'react';
import cable from '../../services/Cable';

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
  
  componentDidMount() {
    this.subscription = cable.subscriptions.create({ channel: 'GameChannel', game_id: 1 }, {

      connected() { 
        console.log('connected: action cable')
      },
      
      received(data) {
        console.log('I have received the data')
        console.log(JSON.parse(data.game))
      },

      speak(title) {
        return this.perform('speak', { title: title });
      },

      getGame() {
        return this.perform('get_game', null);
      },

      disconnected() { 
        console.log("disconnected: action cable" )
      }
    })
    
    setTimeout(() => {
      this.subscription.getGame();
    }, 1000) 
  }
  
  componentWillUnmount() {
    this.subscription && cable.subscriptions.remove(this.subscription)
  }
  
  createGame = (title) => this.subscription.speak(title);

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


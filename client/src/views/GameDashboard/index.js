import React, { Component } from 'react';
import cable from '../../services/Cable';

class GameDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      game: {}
    }
  }

  componentDidMount() {
    var self = this;
    const gameId = self.props.match.params.gameId
    this.subscription = cable.subscriptions.create({channel: 'GameRoomChannel', game_id: gameId}, {

      connected() { 
        console.log('connected: action cable')
      },
      
      received(data) {
        console.log('I have received the data')
        if (data.game) {
          var game = JSON.parse(data.game)
          self.setState({
            game
          })
        } else if (data.errors) {
          console.log(JSON.parse(data.errors))
        }
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
      console.log('game gotten')
    }, 1000) 
  }
  
  render() {
    return (
      <div>
        <h1>GameDashboard</h1> 
        <div>
          <h2>{this.game.title}</h2>
          <ul>
            {this.state.game.game_cards.map(c => <li key={c.id}>c.id</li>)}
          </ul>
        </div>
      </div>
    )
  }
}

export default GameDashboard;
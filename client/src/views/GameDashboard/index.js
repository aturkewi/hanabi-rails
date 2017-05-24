import React, { Component } from 'react';
import createCable from '../../services/Cable';

class GameDashboard extends Component {

  constructor(props) {
    super(props);
    
    this.handleJoin = this.handleJoin.bind(this)
    this.handleStartGame = this.handleStartGame.bind(this)
    
    this.state = {
      game: {
        title: '',
        id: '',
        game_cards: [],
        hands: [
          {
            user: {
              id: '',
              username: ''
            },
            game_cards: []
          }
        ],
        status: 'setup'
      }
    }
  }
  
  handleJoin(){
    this.subscription.joinGame()
  }
  
  handleStartGame(){
    this.subscription.startGame()
  }


  componentDidMount() {
    const cable = createCable()
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
      
      joinGame() {
        return this.perform('join_game', {game_id: self.state.game.id}) 
      },

      startGame() {
        return this.perform('start_game', {game_id: self.state.game.id});
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
        <h1>{this.state.game.title}</h1>
        <div>
          <h2>Current Players</h2>
          <ul>
            {this.state.game.hands.map(h => (
              <li key={h.user.id}>
                {h.user.username}
                <ul>
                  {h.game_cards.map(c => (
                    <li key={c.id}>{c.id}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button onClick={this.handleJoin}>Join Game!</button>
        </div>
        <div>
          { this.state.game.hands.length > 1 ? <button onClick={this.handleStartGame}>Start Game</button> : ''}
        </div>
        <div>
          <ul>
            <li>
              Cards Left in Deck: {this.state.game.game_cards.length}
              
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default GameDashboard;
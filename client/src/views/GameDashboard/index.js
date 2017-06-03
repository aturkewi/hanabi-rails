import React, { Component } from 'react';
import createCable from '../../services/Cable';

import GameSetup from './GameSetup';
import ActiveGame from './ActiveGame';

class GameDashboard extends Component {

  constructor(props) {
    super(props);
    
    // this.handleJoin = this.handleJoin.bind(this)
    this.handleStartGame = this.handleStartGame.bind(this)
    this.handleClue = this.handleClue.bind(this)
    
    this.state = {
      game: {
        title: '',
        id: '',
        deck: [],
        hands: [
          {
            user: {
              id: '',
              username: ''
            },
            cards: []
          }
        ],
        clue_counter: 8,
        miss_counter: 3,
        status: 'setup'
      }
    }
  }
  
  handleJoin =()=>{
    this.subscription.joinGame()
  }
  
  handleStartGame(){
    this.subscription.startGame()
  }

  handleClue(cluedHand, clue, event){
    this.subscription.giveClue(cluedHand.id, clue)
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
      
      giveClue(handId, clue) {
        return this.perform('give_clue', {
          game_id: self.state.game.id,
          hand_id: handId,
          clue: clue
        })
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
    let componentToRender = null;
    if (this.state.game.status == 'setup'){
      componentToRender = <GameSetup handleJoin={this.handleJoin} handleStart={this.handleStartGame} hands={this.state.game.hands}/>
    } else {
      componentToRender = (
        <ActiveGame
          game={this.state.game}
          handleClue={this.handleClue}
        />  
      )
    }
    
    return (
      <div>
        <h1>{ this.state.game.title }</h1>
        { componentToRender }
      </div>
    )
  }
}

export default GameDashboard;
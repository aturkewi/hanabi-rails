import React, { Component } from 'react';
import createCable from '../../services/Cable';
import { connect } from 'react-redux';
import { 
  setGame, 
  fetchingGame, 
  fetchingGameFailure 
} from '../../redux/modules/Game/actions';
import GameSetup from './GameSetup';
import ActiveGame from './ActiveGame';

class GameDashboard extends Component {

  // constructor(props) {
  //   super(props);
  //   
  //   this.handleJoin = this.handleJoin.bind(this)
  //   this.handleStartGame = this.handleStartGame.bind(this)
  //   this.handleClue = this.handleClue.bind(this)
  //   
  //   this.state = {
  //     game: {
  //       title: '',
  //       id: '',
  //       deck: [],
  //       hands: [
  //         {
  //           user: {
  //             id: '',
  //             username: ''
  //           },
  //           cards: []
  //         }
  //       ],
  //       clue_counter: 8,
  //       miss_counter: 3,
  //       status: 'setup'
  //     }
  //   }
  // }
  
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
    const { setGame, fetchingGame, fetchingGameFailure } = this.props
    
    const self = this;
    const gameId = self.props.match.params.gameId
    this.cable = createCable()
    this.subscription = this.cable.subscriptions.create({channel: 'GameRoomChannel', game_id: gameId}, {

      connected() { 
        console.log('connected: action cable');
        fetchingGame();
        this.getGame();
      },
      
      received(data) {
        console.log('I have received the data')
        if (data.game) {
          var game = JSON.parse(data.game)
          setGame(game)
          // self.setState({
          //   game
          // })
        } else if (data.errors) {
          fetchingGameFailure()
          console.log(JSON.parse(data.errors))
        }
      },

      getGame() {
        return this.perform('get_game', null);
      },
      
      joinGame() {
        return this.perform('join_game', {game_id: self.props.game.id}) 
      },

      startGame() {
        return this.perform('start_game', {game_id: self.props.game.id});
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
    if (this.props.game.status == 'setup'){
      componentToRender = <GameSetup handleJoin={this.handleJoin} handleStart={this.handleStartGame} hands={this.props.game.hands}/>
    }else if (this.props.game.status == 'active') {
      componentToRender = (
        <ActiveGame
          game={this.props.game}
          handleClue={this.handleClue}
        />
      )
    }else {
      componentToRender = <div>Loading...</div>
    }
    
    return (
      <div>
        <h1>{ this.props.game.title }</h1>
        { componentToRender }
      </div>
    )
  }
}

export default connect(
  state => ({
    game: state.game.game
  }), {
    setGame,
    fetchingGame,
    fetchingGameFailure
  }
)(GameDashboard);
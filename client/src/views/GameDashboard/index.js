import React, { Component } from 'react';
import cable from '../../services/Cable';

class GameDashboard extends Component {

  componentDidMount() {
    const self = this;
    this.subscription = cable.subscriptions.create('GameChannel', {

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
        } else if (data.game) {
          console.log(JSON.parse(data.game))
        } else if (data.errors) {
          console.log(JSON.parse(data.errors))
        }
      },
      
      getGame() {
        const id = self.props.match.params.slug
        return this.perform('get_game', { id: id });
      },

      disconnected() { 
        console.log("disconnected: action cable" )
      }
    })
    
    setTimeout(() => {
      this.subscription.getGame();
    }, 1000) 
  }

  render() {
    return (
      <div>
        <h1>GameDashboard</h1>
      </div>
    )
  }
}

export default GameDashboard;
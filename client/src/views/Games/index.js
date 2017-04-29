import React, { Component } from 'react';
import cable from '../../services/Cable';
import { Link } from 'react-router-dom'

class Games extends Component { 

  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
      games: []
    }
  }
  
  componentDidMount() {
    var self = this;
    this.subscription = cable.subscriptions.create('GameChannel', {

      connected() { 
        console.log('connected: action cable')
      },
      
      received(data) {
        console.log('I have received the data')
        if (data.games) {
          var games = JSON.parse(data.games).games
          self.setState({
            games
          })
        } else if (data.game) {
          console.log(JSON.parse(data.game))
        } else if (data.errors) {
          console.log(JSON.parse(data.errors))
        }
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
    })
    
    setTimeout(() => {
      this.subscription.getGames();
    }, 1000) 
  }
  
  componentWillUnmount() {
    this.subscription && cable.subscriptions.remove(this.subscription);
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    this.subscription.speak(this.state.inputValue);
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

    var renderGames = this.state.games.map(game => <div key={game.id}><Link to={`/games/${game.id}`}>{game.title}</Link></div>)

    return(
      <div>
        <h1>Games Channel</h1>
        <form onSubmit={this.handleOnSubmit}> 
          <input onChange={(event) => this.handleOnChange(event)} value={this.state.inputValue} />
        </form>
        {renderGames}
      </div>
    )
  }
}

export default Games;


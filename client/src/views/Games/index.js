import React, { Component } from 'react';
import createCable from '../../services/Cable';
import { connect } from 'react-redux';
import { 
  setGames, 
  fetchingGames, 
  fetchingGamesFailure 
} from '../../redux/modules/Games/actions';
import { Link } from 'react-router-dom';

class Games extends Component { 

  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
    }
  }
  
  componentDidMount() {
    const { setGames, fetchingGames, fetchingGamesFailure } = this.props
    this.cable = createCable()
    this.subscription = this.cable.subscriptions.create('GamesChannel', {

      connected() { 
        console.log('connected: action cable')
        fetchingGames()
        this.getGames();
      },
      
      received(data) {
        if (data.games) {
          setGames(JSON.parse(data.games).games)
        } else if (data.errors) {
          // TODO: error notification service action for JSON.parse(data.errors)
          fetchingGamesFailure()
        }
      },

      createGame(title) {
        this.perform('create_game', { title: title });
        fetchingGames()
      },

      getGames() {
        return this.perform('get_games', null);
      },

      disconnected() { 
        console.log("disconnected: action cable" )
      }
    })
  }
  
  componentWillUnmount() {
    this.subscription && this.cable.subscriptions.remove(this.subscription);
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    this.subscription.createGame(this.state.inputValue);
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

    var renderGames = this.props.games.map(game => <div key={game.id}><Link to={`/games/${game.id}`}>{game.title}</Link></div>)

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

export default connect(
  state => ({
    games: state.games.list,
    gamesStatus: state.games.status
  }), {
    setGames,
    fetchingGames,
    fetchingGamesFailure
  }
)(Games);
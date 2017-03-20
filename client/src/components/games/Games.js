import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NewGame from './NewGame';
import { createGame, loadGames } from '../../actions/gamesActions';
import { Link } from 'react-router';

class Games extends Component {

  componentWillMount() {
    this.props.actions.loadGames();
  }

  render() {
    const { games, children } = this.props;
    return (
      <div>
        { 
          !children ? 
            <div>
              <NewGame createGame={this.props.actions.createGame} />
              <h2>Existing Games</h2>
              <ul>
                {games.map((game, i) => <li key={i}><Link to={`/games/${game.id}`}>{game.title}</Link></li>)}          
              </ul>
            </div>
          :
            <div>
              {children}
            </div>
        }
        
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    games: state.games,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ 
      createGame,
      loadGames,
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Games);

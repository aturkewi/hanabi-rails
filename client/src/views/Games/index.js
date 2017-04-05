// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchGames } from '../../redux/modules/Games/actions';
import HelpersService from '../../services/Helpers';

type game = {
  title: string
}

type Props = {
  gamesList: Array<game>,
  fetchGames: () => void,
}

class Games extends Component {

  props: Props 

  componentDidMount() {
    this.props.fetchGames();
  }

  render() {
    const renderGames = this.props.gamesList.map(game => 
      <NavLink key={game.id} to={`/games/${HelpersService.slugify(game.title)}`}>
        <div>
          <h2>{game.title}</h2>
        </div>
      </NavLink>
    );

    return (
      <div>
        <h1>Games</h1>
        {renderGames}
      </div>
    );
  }
}

export default connect(
  state => ({
    gamesList: state.games.list
  }), { fetchGames }
)(Games);
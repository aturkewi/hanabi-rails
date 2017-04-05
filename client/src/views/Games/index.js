// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGames } from '../../redux/modules/Games/actions';

type game = {
  title: string
}

type Props = {
  games: Array<game>,
  fetchGames: () => void,
}

class Games extends Component {

  props: Props 

  componentDidMount() {
    this.props.fetchGames();
  }

  render() {
    console.log(this.props.games);

    return (
      <div>
        <h1>Games</h1>
      </div>
    );
  }
}

export default connect(
  state => ({
    games: state.games
  }), { fetchGames }
)(Games);
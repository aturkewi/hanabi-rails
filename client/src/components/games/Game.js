import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as gameActions from '../../actions/gameActions';

class Game extends Component {

  componentWillMount() {
    this.props.actions.loadGame(this.props.params.gameId);
  }
  
  render() {
    return(
      <div>
        {this.props.game.title}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    game: state.currentGame
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(gameActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
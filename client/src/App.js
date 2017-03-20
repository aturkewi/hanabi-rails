import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import './App.css';
import './simple-grid.css'
import { addPlayer, startGame, discardCard, increaseClue, drawCard, nextTurn, playCard, giveClue } from './actions/hanabiActions'
import { signUp, updateErrors, login } from './actions/authActions';

import NavBar from './components/navigation/Navbar';
import Home from './components/Home';

const App = (props) => {

  const byChild = () => {
    switch(props.location.pathname){
      case "/signup":
        return React.cloneElement(props.children, {
          errors: props.auth.errors,
          router: props.router,
          profile: props.auth.profile,
          actions: {
            signUp: props.actions.signUp,
            updateErrors: props.actions.updateErrors
          }
        });
      case "/login":
        return React.cloneElement(props.children, {
          login: props.actions.login
        })
      default:
        return React.cloneElement(props.children);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <NavBar auth={props.auth} />
        <div>
          {
            /* 
              TODO :
              we should use connect with our SignUp component 
              to destroy this complex code of byChild() 
            */
            (byChild()) || <Home />
          }
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state){
  return {
    game: state.game,
    auth: state.auth
  };
};

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({ 
      addPlayer, 
      startGame, 
      discardCard, 
      increaseClue, 
      drawCard, 
      nextTurn, 
      playCard, 
      giveClue, 
      signUp, 
      updateErrors,
      login,
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

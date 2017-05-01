// @flow 
import React, { Component } from 'react';
import {
  BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { authenticate, authenticationFailure, logout } from '../redux/modules/Auth/actions';
import Navbar from '../components/Navbar';
import MatchAuthenticated from '../components/MatchAuthenticated';
import RedirectUnauthenticated from '../components/RedirectUnauthenticated';
import Games from '../views/Games';
import GameDashboard from '../views/GameDashboard';
import Signup from '../views/Signup';
import Login from '../views/Login';
import NotFound from '../components/NotFound';

type Props = {
  isAuthenticating: boolean,
  isAuthenticated: boolean,
  logout: () => void,
  authenticate: () => void,
  authenticationFailure: () => void,
}

class App extends Component {

  props: Props

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Fetching a new token!');
      this.props.authenticate();
    } else {
      this.props.authenticationFailure();
    }
  }

  render() {
    const { isAuthenticated, isAuthenticating, logout } = this.props;
    const authProps = { isAuthenticated, isAuthenticating };

    return (
      <Router>
        <Container fluid>
          <div className="app">
            <Navbar isAuthenticated={isAuthenticated} logout={logout} />
            <Switch>
              <MatchAuthenticated path="/" exact component={Games} {...authProps} />
              <MatchAuthenticated path="/games/:gameId" exact component={GameDashboard} {...authProps} />
              <MatchAuthenticated path="/games" exact component={Games} {...authProps} />
              <RedirectUnauthenticated path="/login" exact component={Login} {...authProps} />
              <RedirectUnauthenticated path="/signup" exact component={Signup} {...authProps} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Container>
      </Router>
    )
  }
}

export default connect(
  state => ({
    isAuthenticating: state.auth.isAuthenticating,
    isAuthenticated: state.auth.isAuthenticated,
  }), { logout, authenticate, authenticationFailure }
)(App);
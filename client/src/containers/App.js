// @flow 
import React, { Component } from 'react';
import {
  BrowserRouter as Router, 
  Switch,
  Redirect, 
  Route
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { authenticate, authenticationFailure, logout } from '../redux/modules/Auth/actions';
import Signup from '../views/Signup';
import Navbar from '../components/Navbar';

type CurrentUser = {
  id: number,
  first_name: string,
  last_name: string,
  username: string,
  email: string,
}

type Props = {
  isAuthenticating: boolean,
  isAuthenticated: boolean,
  currentUser: CurrentUser,
  logout: () => void,
  authenticate: () => void,
  authenticationFailure: () => void,
}

class App extends Component {

  props: Props

  componentDidMount() {
    const token: string = localStorage.getItem('token');
    if (token) {
      console.log('Fetching a new token!');
      this.props.authenticate();
    } else {
      this.props.authenticationFailure();
    }
  }

  render() {
    const { isAuthenticated, isAuthenticating, currentUser, logout } = this.props;

    return (
      <Router>
        <Container>
          <div className="app">
            <Navbar isAuthenticated={isAuthenticated} logout={logout} />
            <Switch>
              <Route path="/" exact render={() => (
                (isAuthenticated && currentUser) ? (
                  <h1>Welcome To Hanabi</h1>
                ) : (
                  <Redirect to="/login" />
                )
              )} />
              <Signup />
              
            </Switch>
          </div>
        </Container>
      </Router>
    );
  }
}

export default connect(
  state => ({
    isAuthenticating: state.auth.isAuthenticating,
    isAuthenticated: state.auth.isAuthenticated,
    currentUser: state.auth.currentUser,
  }), { logout, authenticate, authenticationFailure }
)(App);
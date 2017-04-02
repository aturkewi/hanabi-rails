// @flow 
import React, { Component } from 'react';
import {
  BrowserRouter as Router, 
  Switch
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logout } from '../redux/modules/Auth/actions';
import Signup from '../views/Signup';
import Navbar from '../components/Navbar';

type Props = {
  isAuthenticated: boolean,
  logout: () => void,
}

class App extends Component {

  props: Props

  render() {
    const { isAuthenticated, logout } = this.props;

    return (
      <Router>
        <Container>
          <div className="app">
            <Navbar isAuthenticated={isAuthenticated} logout={logout} />
            <Switch>
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
    isAuthenticated: state.auth.isAuthenticated,
  }), { logout }
)(App);
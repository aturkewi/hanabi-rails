import React, { Component } from 'react';
import {
  BrowserRouter as Router, 
  Route, 
  Switch, 
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
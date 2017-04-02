import React, { Component } from 'react';
import {
  BrowserRouter as Router, 
  Switch
} from 'react-router-dom';
import Signup from '../views/Signup';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Signup />
            
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
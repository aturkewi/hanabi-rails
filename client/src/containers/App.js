import React, { Component } from 'react';
import {
  BrowserRouter as Router, 
  Switch
} from 'react-router-dom';

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
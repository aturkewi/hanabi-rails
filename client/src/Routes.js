import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './components/Home';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Games from './components/games/Games';
import Game from './components/games/Game'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/signup" component={SignUp}/>
    <Route path="/login" component={Login}/>
    <Route path="/games" component={Games}>
        <Route path="/games/:gameId" component={Game}></Route>
    </Route>
  </Route>
)
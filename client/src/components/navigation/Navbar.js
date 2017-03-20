import React from 'react';
import NavLink from './NavLink';
import { isAuthenticated } from '../../services/authService';

export default ({ auth }) => {
  return (
    <div>
      <NavLink
        to="/"
        onlyActiveOnIndex={true}
      >
        Home
      </NavLink>
      {
        /* Logged In Routes */
        isAuthenticated() ?
        
        <div>
          <NavLink to="/games">
            Games
          </NavLink>
        </div>

        :

        /* Logged Out Routes */
        <div>
          <NavLink
            to="/signup"
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/login"
          >
            Login
          </NavLink>
        </div>
      }
    </div>
  )
}

// @flow
import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({

    link: {
      ':hover': {
        background: 'rgba(255,255,255,.15)',
      }
    },

    logout: {
      cursor: 'pointer',
      ':hover': {
        background: 'rgba(255,255,255,.15)',
      }
    }
});

type Props = {
  isAuthenticated: boolean,
  logout: () => void,
}

class Navbar extends Component {

  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleLogout = () => this.props.logout(this.context.router);

  render() {
    const { isAuthenticated } = this.props

    return (
      <div className="navbar">
        {isAuthenticated ?
          <Menu inverted style={{borderRadius: '0'}}>
            <NavLink 
              to='/games'
              className={css(styles.link)}
              activeStyle={{
                background: 'rgba(255,255,255,.15)',
              }}
            ><Menu.Item>Games</Menu.Item></NavLink>
            <Menu.Item 
              className={css(styles.logout)}
              onClick={this.handleLogout}
            >Logout</Menu.Item>
          </Menu>

          : 

          <Menu inverted>
            <NavLink 
              to='/login'
              className={css(styles.link)}
              activeStyle={{
                background: 'rgba(255,255,255,.15)',
              }}
            ><Menu.Item>Login</Menu.Item></NavLink>

            <NavLink 
              to='/signup'
              className={css(styles.link)}
              activeStyle={{
                background: 'rgba(255,255,255,.15)',
              }}
            ><Menu.Item>Signup</Menu.Item></NavLink>
          </Menu>
        }
      </div>
    );
  }
}

export default Navbar;

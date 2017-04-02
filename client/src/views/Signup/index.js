import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../redux/modules/Auth/actions';
import SignupForm from './SignupForm';

class Signup extends Component {

  static contextTypes = {
    router: PropTypes.object,
  }

  handleSignup = data => this.props.signup({ user: data }, this.context.router);

  render() {
    return (
      <div className="signup">
        <h3>Create an Account</h3>
        <SignupForm onSubmit={this.handleSignup} />
      </div>
    );
  }
}

export default connect(null, { signup })(Signup);

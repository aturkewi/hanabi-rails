import React from 'react';

export default (props) => {
  console.log('ping')

  const { login } = props

  let input = {};

  const handleSubmit = (event) => {
    event.preventDefault();

    let username = input['username'].value.trim();
    let password = input['password'].value.trim();
    
    input={};
    login(username, password);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">User Name</label>
          <input
            ref={node => input.username = node}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            ref={node => input.password = node}
            type="password"
          />
        </div>
        <input
          type="submit"
          value="Login" 
          />
      </form>
    </div>
  )
  
}

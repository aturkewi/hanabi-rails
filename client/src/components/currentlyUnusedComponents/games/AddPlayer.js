import React from 'react';

export default (props) => {  
  const handleSubmit = event => {
    event.preventDefault();
    const playerName = event.target.children[0].value;
    props.addPlayer(playerName);
  }
  return(
    <div>
      <form onSubmit={handleSubmit} >
        <input type="text" name="playerName" />
        <input type="submit" value="Add Player" />
      </form>
    </div>
  )
}
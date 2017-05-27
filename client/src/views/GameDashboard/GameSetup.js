import React from 'react';

const GameSetup = (props) => {
  return (
    <div className='player-setup'>
      <div className='player-list'>
        <h2>Current Players</h2>
        <ul>
          {props.hands.map(h => (
            <li key={h.user.id}>
              {h.user.username}
            </li>
          ))}
        </ul>
      </div>
      
      <div className='join-game'>
        <button onClick={props.handleJoin}>Join Game!</button>
      </div>
      
      <div className='start-game'>
        { props.hands.length > 1 ? <button onClick={props.handleStart}>Start Game</button> : ''}
      </div>
    </div>
  )
}

export default GameSetup;
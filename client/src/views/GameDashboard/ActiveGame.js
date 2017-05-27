import React from 'react';

const ActiveGame = (props) => {
  return(
    <div className='active-game'>
      <div>
        <h2>Current Players</h2>
        <ul>
          {props.game.hands.map(h => (
            <li key={h.user.id}>
              {h.user.username}
              <ul>
                {h.cards.map(c => (
                  <li key={c.id}>{c.color + c.number}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ActiveGame;
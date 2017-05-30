import React from 'react';
import Card from './Card'

const ActiveGame = (props) => {
  return(
    <div className='active-game'>
      <div>
        <h2>The state of affairs</h2>
        <ul>
          <li>
            Cards left in the deck: { props.game.deck.length }
          </li>
          <li>
            Clues left: { props.game.clue_counter }
          </li>
          <li>
            Misses remaining: { props.game.miss_counter }
          </li>
        </ul>
        <h2>Players</h2>
        <ul>
          {props.game.hands.map(h => (
            <li key={h.user.id}>
              {h.user.username}
              <ul>
                {h.cards.map(c => (
                  <li key={c.id}><Card card={c} handleClue={props.handleClue.bind(null, h)} currentPlayer={false}/></li>
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
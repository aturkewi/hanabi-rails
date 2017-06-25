import React from 'react';
import Card from './Card'
import Hand from './Hand'
import './Hand.css'

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
              <Hand
                isCurrentPlayer={props.game.current_player_id === h.id}
                isCurrentUser={props.currentUser.id === h.user.id}
                hand={h}
                handleClue={props.handleClue}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ActiveGame;
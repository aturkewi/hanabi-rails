import React from 'react';
import Card from './Card';
// import './Player.css'

const Hand = props => {
  return (
    <div className={props.isCurrentPlayer ? "current-player" : "not-current-player"}>
      <h3>{props.hand.user.username}</h3>
      <ul className="cards">
        {props.hand.cards.map((c, i)=> <Card card={c} key={i} currentPlayer={props.currentPlayer} handleDiscard={props.handleDiscard} handlePlay={props.handlePlay} handleClue={props.handleClue.bind(null, props.hand.user)}/>)}
      </ul>
    </div>
  )
}

module.exports = Hand;
import React from 'react';
import Card from './Card';
import './Player.css'

const Player = props => {
  return (
    <div className={props.currentPlayer ? "current-player" : ""}>
      <h3>{props.player.name}</h3>
      <ul className="cards">
        {props.player.hand.map((c, i)=> <Card card={c} key={i} currentPlayer={props.currentPlayer} handleDiscard={props.handleDiscard} handlePlay={props.handlePlay} handleClue={props.handleClue.bind(null, props.player)}/>)}
      </ul>
    </div>
  )
}

module.exports = Player;
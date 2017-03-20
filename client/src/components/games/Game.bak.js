import React from 'react';
import Player from './Player';
import Card from './Card';

import AddPlayer from './AddPlayer';

export default (props) => {
  const { players, deck, currentPlayerId, clueCounter, discard, played, missesRemaining } = props.game;
  
  const handleDiscard = (discardedCard, event) => {
    let currentPlayer = players[currentPlayerId]
    // event.preventDefault();
    props.actions.discardCard(currentPlayer, discardedCard, clueCounter, deck, players)
  }
  const handlePlay = (playedCard, event) => {
    let currentPlayer = players[currentPlayerId];
    props.actions.playCard(currentPlayer, playedCard, played, deck, missesRemaining, players)
  }
  const handleClue = (cluedPlayer, clue, event) => {
    
    props.actions.giveClue(clue, cluedPlayer, players, currentPlayerId, clueCounter);
  }
  const colors = ['Blue', 'Green', 'Red', 'White', 'Yellow']
  // const sortByColor = cardSet => {
  //   
  // }
  return(
    <div>
      <div className="row">
        {(players.length > 1) ? <button onClick={props.actions.startGame.bind(null, players, deck)}>Start Game</button> : ''}
      </div>
      <div className="row">
        <div className="col-4">
          <h3>Clue Remaining: {clueCounter}</h3>
        </div>
        <div className="col-4">
          <h3>Misses Remaining: {missesRemaining}</h3>
        </div>
        <div className="col-4">
          <h3>Cards Remaining: {deck.length}</h3>
        </div>
      </div>
      <div className="row">      
        {players.map((p, i) => {
          return (<div className="col-2" key={i}>
            <Player key={i} player={p} 
              currentPlayer={currentPlayerId === p.id} 
              clueCounter={props.game.clueCounter}
              handleDiscard={handleDiscard}
              handlePlay={handlePlay}
              handleClue={handleClue}
            />
          </div>)})
        }
      </div>
      <div className="row">
        <div className="col-6">
          <h3>Played Cards</h3>
          <div className="row">
            {colors.map((color, i) => (
              <div className="col-2" key={i}>
                <h4>{color}</h4>
                <ul className="cards">
                  {played.filter(c => c.color === color).map((card,i) => (
                    <Card card={card} key={i}/>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="col-6">
          <h3>Discarded Cards</h3>
          <div className="row">
            {colors.map((color, i) => (
              <div className="col-2" key={i}>
                <h4>{color}</h4>
                <ul className="cards">
                  {discard.filter(c => c.color === color).map((card,i) => (
                    <Card card={card} key={i}/>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
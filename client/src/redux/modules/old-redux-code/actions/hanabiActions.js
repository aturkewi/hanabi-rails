const getRandCard = (deck) =>{
  const randNum = Math.floor(Math.random()*deck.length);
  return deck.splice(randNum,1)[0]
}

const increaseClue = (currentClues) => {
  let clueCounter = currentClues
  if (clueCounter < 8){ clueCounter = currentClues + 1 }
  return clueCounter
}

const removeFromHand = (originalPlayer, discardedCard) => {
  const hand = originalPlayer.hand.filter(card => card.id !== discardedCard.id);
  const player = Object.assign({}, originalPlayer, { hand })
  return player
}

const  drawCard = (originalDeck, originalPlayer) => {
  const deck = [...originalDeck];
  const hand = [Object.assign({}, getRandCard(deck)), ...originalPlayer.hand]
  const player = Object.assign({}, originalPlayer, { hand })
  return { deck, player }
}

const nextTurn = (players, originalCurrentPlayer) => {
  let currentPlayerId;
  if(originalCurrentPlayer === (players.length - 1)){
    currentPlayerId = 0
  }else{
    currentPlayerId = originalCurrentPlayer + 1 
  }
  return currentPlayerId
}

const isPlayable = (card, played) => {
  const cardInColor = played.filter(c => c.color === card.color)
  return card.number === (cardInColor.length + 1)
}

const updateCards = (clue, player) => {
  const clueType = typeof(clue) === "string" ? "color" : "number"
  const hand = player.hand.map(card => {
    if (card[clueType] === clue){
      return Object.assign({}, card, { [`${clueType}Exposed`]: true });
    }else{
      return card;
    }
  })
  return Object.assign({}, player, { hand });
}

export function resetGame(){
  return {type: "RESET_GAME"}
}

export function addPlayer(playerName){  
  return {type: "ADD_PLAYER", playerName}
}

export function startGame(originalPlayers, originalDeck){
  const deck = [...originalDeck];
  let cardCount;
  if (originalPlayers.length > 1 && originalPlayers.length < 4){
    cardCount = 5;
  }else if (originalPlayers.length >= 4 && originalPlayers.length <= 5) {
    cardCount = 4;
  }
  const players = originalPlayers.map(p => {
    const hand = [];
    for(let i = 0; i < cardCount; i++ ){
      hand.push(getRandCard(deck));
    }
    return Object.assign({}, p, { hand });
  });
  return {type: "START_GAME", players, deck}
}

export function discardCard(originalPlayer, discardedCard, currentClues, originalDeck, players) {
  let player = removeFromHand(originalPlayer, discardedCard)
  const clueCounter = increaseClue(currentClues)
  const playerAndDeck = drawCard(originalDeck, player)
  const deck = playerAndDeck.deck
  player = playerAndDeck.player
  const currentPlayerId = nextTurn(players, originalPlayer.id)
  return {type: "DISCARD_CARD", deck, player, clueCounter, discardedCard, currentPlayerId}
}

export function playCard(originalPlayer, playedCard, played, originalDeck, originalMissesRemaining, players){
  let player = removeFromHand(originalPlayer, playedCard);
  let missesRemaining = originalMissesRemaining;
  const playerAndDeck = drawCard(originalDeck, player)
  const deck = playerAndDeck.deck
  player = playerAndDeck.player
  const currentPlayerId = nextTurn(players, originalPlayer.id)
  if (isPlayable(playedCard, played)){
    return {type: "PLAY_CARD", deck, player, currentPlayerId, playedCard}
  }else{
    missesRemaining -= 1
    return {type: "MISPLAY_CARD", deck, player, missesRemaining, playedCard, currentPlayerId}
  }
}

export function giveClue(clue, cluedPlayer, players, originalCurrentPlayerId, originalClueCounter){
  const player = updateCards(clue, cluedPlayer);
  const clueCounter = originalClueCounter - 1;
  const currentPlayerId = nextTurn(players, originalCurrentPlayerId);
  return {type: "GIVE_CLUE", player, clueCounter, currentPlayerId}
}
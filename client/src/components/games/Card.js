import React, { Component } from 'react';

class Card extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      hideOptions: true
    }
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(){
    this.setState({hideOptions: !this.state.hideOptions})
  }
  
  render(){
    const { card, currentPlayer, handlePlay, handleDiscard, handleClue } = this.props;
    let buttons = null;
    if(currentPlayer){
      buttons = ( <div>
        <button 
          hidden={this.state.hideOptions}
          onClick={handleDiscard.bind(null, this.props.card)}>
          Discard
        </button>
        <button 
          hidden={this.state.hideOptions}
          onClick={handlePlay.bind(null, this.props.card)}>
          Play
        </button>
      </div>)
    }else{
      buttons = ( <div>
        <button 
          hidden={this.state.hideOptions}
          onClick={handleClue ? handleClue.bind(null, this.props.card.color) : ''}>
          Color Clue
        </button>
        <button
          hidden={this.state.hideOptions}
          onClick={handleClue ? handleClue.bind(null, this.props.card.number) : ''}>
          Number Clue
        </button>
      </div>)
    }
    const showCard = () => {
      if (currentPlayer){
        return(
          <span className="font-light">
            {`${card.colorExposed ? card.color : '****'} ${card.numberExposed ? card.number : '**'}`}
          </span>
        )
      }else{
        return(
          <span className="font-light">{`${this.props.card.color} ${this.props.card.number}`}</span>
        )
      }
    }
    return (  
      <div key={this.props.index} onClick={this.handleClick}>
        {showCard()}
        {buttons}
      </div>
    )
  }
}

module.exports = Card;
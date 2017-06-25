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
    const { card, isCurrentUser, handleClue } = this.props;
    let buttons = '';
    if(!isCurrentUser){
      buttons = ( <div>
        <button 
          hidden={this.state.hideOptions}
          onClick={handleClue ? handleClue.bind(null, {color: this.props.card.color}) : ''}>
          Color Clue
        </button>
        <button
          hidden={this.state.hideOptions}
          onClick={handleClue ? handleClue.bind(null, {number: this.props.card.number}) : ''}>
          Number Clue
        </button>
      </div>)
    }
    
    const showCard = () => {
      if (isCurrentUser){
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
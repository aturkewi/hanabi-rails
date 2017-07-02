import React, { Component } from 'react';

class Card extends Component{
  constructor(props){
    super(props);

    this.state = {
      hideOptions: true
    }
  }

  handleClick = () => this.setState({hideOptions: !this.state.hideOptions})

  render(){
    const { card, isCurrentUser, isCurrentPlayer, onClueClick, isMyTurn } = this.props;
    let buttons = '';
    if(isMyTurn){
      if(!isCurrentUser){
        buttons = ( <div>
          <button
            hidden={this.state.hideOptions}
            onClick={() => onClueClick({ color: this.props.card.color })}>
            Color Clue
          </button>
          <button
            hidden={this.state.hideOptions}
            onClick={() => onClueClick({ number: this.props.card.number })}>
            Number Clue
          </button>
        </div>)
      }else{
        buttons = (<div>
          <button
            hidden={this.state.hideOptions}
            onClick={() => console.log('Play card')}>
            Play Card
          </button>
          <button
            hidden={this.state.hideOptions}
            onClick={() => console.log('Discard Card')}>
            Discard Card
          </button>
        </div>)
      }
    }

    return (
      <div key={this.props.index} onClick={this.handleClick}>
        <span className="font-light">
          {isCurrentUser ?
            `${card.display_color ? card.color : '****'} ${card.display_number ? card.number : '**'}`
            :
            `${this.props.card.color} ${this.props.card.number}`
          }
        </span>
        {buttons}
      </div>
    )
  }
}

module.exports = Card;

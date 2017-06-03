require 'rails_helper'

RSpec.describe Hand, type: :model do
  describe '#add_card' do
    before(:each) do
      @hand = create(:hand)
      @game_card = @hand.game.game_cards.first
    end
    it 'associates the game_card to the hand' do
      @hand.add_card(@game_card)
      expect(@hand.game_cards.first).to eq(@game_card)
    end
    
    it 'changes location of game_card to :in_hand' do
      @hand.add_card(@game_card)
      expect(@game_card.location).to eq("in_hand")
    end
  end
  
  describe 'relationships' do

    it 'belongs to user' do 
      hand = create(:hand)

      expect(hand.user).not_to eq(nil)
    end

    it 'belongs to a game' do 
      hand = create(:hand)

      expect(hand.game).not_to eq(nil)
    end
  end
end
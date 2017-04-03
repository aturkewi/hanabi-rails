require 'rails_helper'

RSpec.describe Game, type: :model do

  describe 'validations' do 
    it 'requires a title' do 
      game = build(:game, title: nil)

      expect(game.valid?).to equal(false)
      expect(game.errors.full_messages).to eq(["Title can't be blank"])
    end 

    it 'requires that a title is unique' do 
      create(:game)
      game = build(:game)

      expect(game.valid?).to equal(false)
      expect(game.errors.full_messages).to eq(["Title has already been taken"])
    end
  end

  describe 'relationships' do 
    
    it 'has many game_cards' do 
      game = create(:game)
      user = create(:user)
      hand = create(:hand, user: user, game: game)
      game_card = game.game_cards.build(hand: hand, display_color: false, display_number: false, color: 'blue', number: 1).attributes.merge(location: 'in_hand');
      game_card.save
      
      expect(game.game_cards.count).to eq(1)
      expect(game.game_cards.first.id).not_to eq(nil)
    end

    it 'has many hands' do 
      game = create(:game)
      user = create(:user)
      game.hands.create(:hand, user: user)
      
      expect(game.hands.count).to eq(1)
      expect(game.hands.first.id).not_to eq(nil)
    end

    it 'has many players through hands' do 
      game = create(:game)
      game.users.create(:user)
      
      expect(game.players.count).to eq(1)
      expect(game.players.first.id).not_to eq(nil)
    end
  end
end

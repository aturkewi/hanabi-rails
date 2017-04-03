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

    before(:each) do 
      @game = create(:game)
      @user = create(:user)
    end
    
    it 'has many game_cards' do 
      hand = Hand.create(user: @user, game: @game)
      game_card = @game.game_cards.build(hand: hand, display_color: false, location: 0, display_number: false, color: 'blue', number: 1)
      game_card.save
      
      expect(@game.game_cards.count).to eq(1)
      expect(@game.game_cards.first.id).not_to eq(nil)
    end

    it 'has many hands' do 
      @game.hands.create(user: @user)
      
      expect(@game.hands.count).to eq(1)
      expect(@game.hands.first.id).not_to eq(nil)
    end

    it 'has many users through hands' do 
      @game.users << @user
      
      expect(@game.users.count).to eq(1)
      expect(@game.users.first.id).not_to eq(nil)
    end
  end
end

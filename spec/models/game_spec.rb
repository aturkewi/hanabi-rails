require 'rails_helper'

RSpec.describe Game, type: :model do
  
  describe "#number_of_starting_cards" do 
    before(:each) do 
      @game = create(:game)
    end
    
    it "returns 5 if 2-3 players" do 
      2.times { @game.users << create(:user) }
      
      expect(@game.number_of_starting_cards).to equal(5)
      @game.users << create(:user)
      expect(@game.number_of_starting_cards).to equal(5)
    end
    
    it "returns 4 if 4-5 players" do 
      4.times { @game.users << create(:user) }
      
      expect(@game.number_of_starting_cards).to equal(4)
      @game.users << create(:user)
      expect(@game.number_of_starting_cards).to equal(4)
    end
  end

  describe '#start_game' do
    it 'it deals the cards to all players'
    it 'updates the game status'
    it 'will not run if there are more than 5 players'
    it 'will not run if there are fewer than 2 players'
  end

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

  describe 'callback methods' do

    describe 'after creation' do 

      it 'creates the game cards and sets the location to deck' do 
        game = create(:game) 

        game.game_cards.each { |card| expect(card.location).to eq('deck') }
        expect(game.game_cards.count).to eq(50)
      end
    end
  end

  describe 'relationships' do 

    before(:each) do 
      @game = create(:game)
      @user = create(:user)
    end
    
    it 'has many game cards' do 
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

require 'rails_helper'

RSpec.describe Game, type: :model do
  
  describe '#advance_turn' do
    before(:each) do
      @game = create(:game_ready)
      @game.start_game
    end
    it 'sets the current_player to the next player' do
      @game.advance_turn
      expect(@game.current_player.play_position).to eq(2)
    end
    
    it 'goes back to the first player when at the end of rotation' do
      last_player = @game.hands.find{|h| h.play_position == @game.hands.length}
      @game.update(current_player: last_player)
      @game.advance_turn
      
      expect(@game.current_player).to eq(@game.first_player)
    end
  end
  
  describe "#deck" do
    before(:each) do
      @game = create(:game)
    end
    it 'returns all the cards in the deck' do
      expect(@game.deck.count).to eq(50)
    end
    
    it 'does not count cards not in the deck' do
      first_game_card = @game.game_cards.first
      first_game_card.update(location: :discarded)
      
      expect(@game.deck.count).to eq(49)
    end
  end
  
  describe '#give_clue(hand, clue)' do
    before(:each) do
      @game = create(:game_ready)
      @game.start_game
      @hand = @game.hands.sample
    end

    it 'updates all pertaining numbers in a players hand to visible' do
      number = @hand.game_cards.first.number
      @game.give_clue(@hand, {number: number})
      all_cards_of_number = @hand.game_cards.select{|c| c.number == number}
      
      expect(all_cards_of_number.all?{|c| c.display_number}).to be_truthy
    end
    
    it 'updates all pertaining colors in a players hand to visible' do
      color = @hand.game_cards.first.color
      @game.give_clue(@hand, {color: color})
      all_cards_of_color = @hand.game_cards.select{|c| c.color == color}
      
      expect(all_cards_of_color.all?{|c| c.display_color}).to be_truthy
    end
    
    it 'returns falsey if there are no clues to give' do
      @game.update(clue_counter: 0)
      number = @hand.game_cards.first.number
      response = @game.give_clue(@hand, {number: number})
      all_cards_of_number = @hand.game_cards.select{|c| c.number == number}
      
      expect(response).to be_falsey
      expect(all_cards_of_number.all?{|c| c.display_number}).to be_falsey
    end
    
    it 'advances the turn' do
      next_player = @game.next_player
      color = @hand.game_cards.first.color
      @game.give_clue(@hand, {color: color})
      all_cards_of_color = @hand.game_cards.select{|c| c.color == color}
      
      expect(@game.current_player).to eq(next_player)
    end
    
    it 'decreases the games clue counter by 1' do 
      number = @hand.game_cards.first.number
    
      expect { @game.give_clue(@hand, { number: number }) }.to change { @game.clue_counter }.by(-1)
    end
  end
  
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
  
  describe "#play_card" do
    before(:each) do
      @game = create(:game_ready)
      @game.start_game
      @current_hand = @game.current_player
      @card = @current_hand.game_cards.first
    end
    
    context 'card is playable' do
      it 'moves the card to the played pile' do        
        @game.play_card(@card.id)
        @card.reload
        
        expect(@card.location).to eq('played')
      end
      
      it 'removes the card from the players hand' do
        @game.play_card(@card.id)
        @current_hand.reload
        
        expect(@current_hand.game_cards.pluck(:id)).not_to include(@card.id)
      end
      
      it 'adds a new card to players hand' do
        expect { @game.play_card(@card.id) }.to change{ @current_hand.reload.game_cards.count }.by(0)
      end
      
      it 'advances play to the next player' do
        @game.play_card(@card.id)
        @game.reload

        expect(@game.current_player_id).not_to eq(@current_hand.id)
      end
    end
    
    context 'card is not playable' do
      before(:each) do
        @game = create(:game_ready)
        @game.start_game
        @current_hand = @game.current_player
        @card = @current_hand.game_cards.first
      end
      it 'moves the card to the discard pile'
      it 'adds a new card to players hand'
      it 'decrements miss counter if not playable'
      it 'advances play to the next player'
    end
  end

  describe '#start_game' do
    before(:each) do
      @game = create(:game)
      5.times { @game.users << create(:user) }
    end
    
    it 'it deals the cards to all players' do
      @game.start_game
      
      expect(@game.hands.count).to eq(5)
      @game.hands.each do | hand |
        expect(hand.game_cards.count).to eq(4)
      end
    end
    
    it 'removes from the from deck' do
      expect{ @game.start_game }.to change{ @game.deck.count }.by(-4*5)
    end
    
    it 'updates the game status' do
      @game.start_game
      
      expect(@game.status).to eq("active")
    end
    
    it 'will not run if there are fewer than 2 players' do 
      game = create(:game)
      game.users << create(:user)
      expect(game.start_game).to be_falsey
    end
    
    it 'does returns falsey if game status is not :setup' do
      @game.start_game
      
      expect(@game.start_game).to be_falsey
    end
    
    it 'assigns play_order to all the hands' do
      @game.start_game
      play_orders = @game.hands.collect{|h| h.play_position}

      expect(play_orders).to all( be_an(Integer) )
    end
    
    it 'sets current_player' do
      @game.start_game
      current_player = @game.hands.find{|h| h.play_position == 1}

      expect(@game.current_player).to be_a(Hand)
      expect(@game.current_player).to eq(current_player)
    end
  end

  describe 'validations' do 
    it 'requires a title' do 
      game = build(:game, title: nil)

      expect(game.valid?).to equal(false)
      expect(game.errors.full_messages).to eq(["Title can't be blank"])
    end 

    it 'requires that a title is unique' do 
      first_game = create(:game)
      game = build(:game, title: first_game.title)

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

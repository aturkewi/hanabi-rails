require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do 

    it 'requires a username, email, and password upon creation' do 
      user = build(:user, username: nil, email: nil, password: nil)

      expect(user.valid?).to equal(false)
      expect(user.errors.full_messages).to eq(["Password can't be blank", "Email can't be blank", "Username can't be blank"])
    end 

    it 'requires that a username and email are unique' do 
      first_user = create(:user)
      user = build(:user, username: first_user.username, email: first_user.email)

      expect(user.valid?).to equal(false)
      expect(user.errors.full_messages).to eq(["Email has already been taken", "Username has already been taken"])
    end
  end

  describe 'relationships' do 

    before(:each) do 
      @game = create(:game)
      @user = create(:user)
    end

    it 'has many hands' do 
      @user.hands.create(game: @game)
      
      expect(@user.hands.count).to eq(1)
      expect(@user.hands.first.id).not_to eq(nil)
    end

    it 'has many games through hands' do 
      @user.hands.create(game: @game)
      
      expect(@user.games.count).to eq(1)
      expect(@user.games.first.id).not_to eq(nil)
    end

    it 'has many game cards through hands' do 
      hand = @user.hands.create(game: @game)
      hand.game_cards.create(game: hand.game, display_color: false, location: 0, display_number: false, color: 'blue', number: 1)
      
      expect(@user.game_cards.count).to eq(1)
      expect(@user.game_cards.first.id).not_to eq(nil)
    end
  end
end
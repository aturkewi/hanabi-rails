require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do 

    it 'requires a username, email, and password upon creation' do 
      user = build(:user, username: nil, email: nil, password: nil)

      expect(user.valid?).to equal(false)
      expect(user.errors.full_messages).to eq(["Password can't be blank", "Email can't be blank", "Username can't be blank"])
    end 

    it 'requirs that a username and email are unique' do 
      create(:user)
      user = build(:user)

      expect(user.valid?).to equal(false)
      expect(user.errors.full_messages).to eq(["Email has already been taken", "Username has already been taken"])
    end
  end

  describe 'relationships' do 

    it 'has many hands' do 
      game = create(:game)
      user = create(:user)
      user.hands.create(:hand, game: game)
      
      expect(user.hands.count).to eq(1)
      expect(user.hands.first.id).not_to eq(nil)
    end

    it 'has many games through hands'

    it 'has many game_cards through hands' do 
      user = create(:user)
      user.games.create(:game)
      
      expect(user.games.count).to eq(1)
      expect(user.games.first.id).not_to eq(nil)
    end
  end
end
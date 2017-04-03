require 'rails_helper'

RSpec.describe Hand, type: :model do
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
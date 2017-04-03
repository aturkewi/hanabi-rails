require 'rails_helper'

RSpec.describe GameCard, type: :model do
  describe 'validations' do 

    it 'requires a color, number, a game and a location' do 
      game_card = build(:game_card, color: nil, number: nil, game: nil, location: nil)

      expect(game_card.valid?).to equal(false)
      expect(game_card.errors.full_messages).to eq(["Game must exist", "Color can't be blank", "Number can't be blank", "Location can't be blank"])
    end 
  end

  describe 'Enum Location statuses' do
    let(:locations) { [:deck, :played, :discarded, :in_hand] }

    it 'have the right index' do
      locations.each_with_index do |status, index|
        expect(described_class.locations[status]).to eq index
      end
    end
  end

  describe 'relationships' do 

    before(:each) do 
      @game = create(:game)
    end

    it 'belongs to a game' do 
      game_card = create(:game_card, game: @game)

      expect(game_card.game).to eq(@game)
    end

    it 'belongs to a hand' do 
      hand = create(:hand, game: @game)
      game_card = create(:game_card, game: @game, hand: hand)

      expect(game_card.hand).to eq(hand)
    end
  end
end

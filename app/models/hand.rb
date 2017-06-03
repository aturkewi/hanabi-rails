class Hand < ApplicationRecord
  has_many :game_cards
  belongs_to :user
  belongs_to :game
  
  def add_card(game_card)
    game_card.update(location: :in_hand, hand_id: self.id)
  end
end

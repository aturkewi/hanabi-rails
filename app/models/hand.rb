class Hand < ApplicationRecord
  has_many :game_cards
  belongs_to :user
  belongs_to :game
  
  def add_card(game_card)
    game_card.update(location: :in_hand, hand_id: self.id)
  end
  
  def draw
    random_card = self.game.deck.sample
    add_card(random_card)
  end
end

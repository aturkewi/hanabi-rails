class Hand < ApplicationRecord
  has_many :game_cards
  belongs_to :user
  belongs_to :game
end

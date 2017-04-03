class GameCard < ApplicationRecord
  belongs_to :game
  belongs_to :hand, optional: true

  enum location: [:deck, :played, :discarded, :in_hand]

  validates :color, :number, :location, presence: true
end

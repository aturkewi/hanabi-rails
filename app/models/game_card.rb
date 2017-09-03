class GameCard < ApplicationRecord
  belongs_to :game
  belongs_to :hand, optional: true

  enum location: [:deck, :played, :discarded, :in_hand]

  def play!
    self.update(location: :played, hand_id: nil)
  end

  validates :color, :number, :location, presence: true
end

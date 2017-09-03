class GameCard < ApplicationRecord
  belongs_to :game
  belongs_to :hand, optional: true

  enum location: [:deck, :played, :discarded, :in_hand]

  validates :color, :number, :location, presence: true
  
  def discard!
    self.update(location: :discarded, hand_id: nil)
  end

  def play!
    self.update(location: :played, hand_id: nil)
  end

  def playable
    last_played = self.game.played
      .where(color: self.color).order(number: :desc)
      .limit(1).first

    (!last_played && self.number == 1) ||
      (last_played && last_played.number + 1 == self.number)
  end
end

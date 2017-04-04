class Game < ApplicationRecord
  has_many :hands, dependent: :destroy
  has_many :users, through: :hands
  has_many :game_cards, dependent: :destroy

  enum status: [:setup, :active, :completed]

  validates :title, presence: true
  validates :title, uniqueness: true

  after_create :create_deck 

  protected

  def create_deck 
    Deck.cards.each { |card| self.game_cards.create(card) }
  end

end

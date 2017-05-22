class Game < ApplicationRecord
  has_many :hands, dependent: :destroy
  has_many :users, through: :hands
  has_many :game_cards, dependent: :destroy
  belongs_to :current_player, foreign_key: :hand_id, class_name: 'Hand', optional: true

  enum status: [:setup, :active, :completed]

  validates :title, presence: true
  validates :title, uniqueness: true

  after_create :create_deck 
  after_commit { GameBroadcastJob.perform_later(self) }

  def deck
    self.game_cards.where(location: :deck)
  end

  # def start_game
  #   hands.each {|hand| create_starting_hand(hand)}
  # end
  
  # -> create_starting_hand for each player 
    # for each player grab a random card from the deck that has a status of location of "deck"
    # update the card to be in the players hand and in location to be "in_hand"
    
  def number_of_starting_cards 
    case self.users.count
    when 2, 3
      5
    when 4, 5
      4
    end
  end

  protected

  def create_starting_hand(hand)
    number_of_starting_cards.times do
      game_card = game_cards.sample
    end
  end

  def create_deck 
    Deck.cards.each { |card| self.game_cards.create(card) }
  end

end

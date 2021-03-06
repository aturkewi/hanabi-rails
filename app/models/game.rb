class Game < ApplicationRecord
  scope :active_games, -> { where('status != ?', 2) }

  has_many :hands, dependent: :destroy
  has_many :users, through: :hands
  has_many :game_cards, dependent: :destroy
  belongs_to :current_player, class_name: 'Hand', optional: true

  enum status: [:setup, :active, :completed]

  validates :title, presence: true
  validates :title, uniqueness: true

  after_create :create_deck 
  after_commit { GameBroadcastJob.perform_later(self) }

  def advance_turn
    if current_player.play_position == self.hands.length
      update(current_player: first_player)
    else
      update(current_player: next_player)
    end
  end

  def deck
    self.game_cards.where(location: :deck)
  end

  def discarded
    self.game_cards.where(location: :discarded)
  end

  def first_player
    hands.find{|hand| hand.play_position == 1}
  end
  
  def give_clue(hand, full_clue)
    if clue_counter > 0
      attribute = full_clue.keys.first
      clue = full_clue[attribute]
      hand.game_cards.each do |card|
        if card.send(attribute) == clue
          card.update("display_#{attribute}" => true)
        end
      end
      self.update(clue_counter: self.clue_counter - 1)
      self.advance_turn
    end
  end

  def is_startable?
    self.hands.count >= 2 && self.hands.count <= 5 && status == 'setup'
  end
  
  def next_player
    hands.find{|h| h.play_position == current_player.play_position + 1}
  end

  def number_of_starting_cards 
    case self.users.count
    when 2, 3
      5
    when 4, 5
      4
    end
  end
  
  def play_card(card_id)
    card = self.game_cards.find_by(id: card_id)
    hand = card.hand
    if card.playable
      card.play!
    else
      misplay(card)
    end
    hand.draw
    self.advance_turn
  end
  
  def played
    self.game_cards.where(location: :played)
  end
  
  def start_game
    if self.is_startable?
      self.hands.each { |hand| create_starting_hand(hand) }
      self.set_play_order
      self.update(status: :active, current_player: self.first_player)
    end
  end

  protected
  
  def set_play_order
    order = (1..hands.length).to_a.shuffle
    hands.each do | hand |
      play_position = order.pop
      hand.update(play_position: play_position)
    end
  end

  def create_starting_hand(hand)
    number_of_starting_cards.times do
      hand.add_card(self.deck.sample)
    end
  end

  def create_deck 
    Deck.cards.each { |card| self.game_cards.create(card) }
  end

  def misplay(card)
    card.discard!
    self.miss_counter = self.miss_counter - 1
  end

end
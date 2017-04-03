class Game < ApplicationRecord
  has_many :hands 
  has_many :users, through: :hands
  has_many :game_cards

  validates :title, presence: true
  validates :title, uniqueness: true
  
end

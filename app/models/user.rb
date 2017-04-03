class User < ApplicationRecord
  has_many :hands
  has_many :games, through: :hands
  has_many :game_cards, through: :hands

  has_secure_password
  validates :email, :username, presence: true
  validates :email, :username, uniqueness: true
end

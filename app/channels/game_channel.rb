class GameChannel < ApplicationCable::Channel

  def subscribed
    stream_from Game.all
  end

  def unsubscribed
  end
  
end
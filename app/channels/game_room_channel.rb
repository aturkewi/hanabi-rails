class GameRoomChannel < ApplicationCable::Channel

  def subscribed
    stream_from "game_channel"
  end

  def unsubscribed
  end

  def get_game 
    game = Game.find_by(id: params[:id])
    ActionCable.server.broadcast('game_channel', game: render_game(game))
  end

  private 

  def render_game(game)
    ApplicationController.renderer.render(partial: "games/game.json.jbuilder", locals: { game: game })
  end
  
end
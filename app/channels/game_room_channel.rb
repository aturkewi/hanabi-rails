class GameRoomChannel < ApplicationCable::Channel

  def subscribed
    stream_from "game_room_channel_#{params[:game_id]}"
  end

  def unsubscribed
  end

  def get_game
    game = Game.find_by(id: params[:game_id])
    ActionCable.server.broadcast("game_room_channel_#{params[:game_id]}", game: render_game(game))
  end

  private 

  def render_game(game)
    ApplicationController.renderer.render(partial: "games/game.json.jbuilder", locals: { game: game })
  end
  
end
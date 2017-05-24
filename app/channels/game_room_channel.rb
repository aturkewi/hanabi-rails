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
  
  def join_game(params)
    game_id = params['game_id']
    game = Game.find_by(id: game_id)
    if game.users.include?(current_user)
      ActionCable.server.broadcast("game_room_channel_#{game_id}", errors: ['You are already in this game'])
    else
      game.users << current_user
      ActionCable.server.broadcast("game_room_channel_#{game_id}", game: render_game(game))
    end
  end
  
  def start_game(params)
    binding.pry
    game_id = params['game_id']
    game = Game.find_by(id: game_id)
    game.start_game
    ActionCable.server.broadcast("game_room_channel_#{game_id}", game: render_game(game))
  end

  private 

  def render_game(game)
    ApplicationController.renderer.render(partial: "games/game.json.jbuilder", locals: { game: game })
  end
  
end
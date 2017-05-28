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
    game_id = params['game_id']
    game = Game.find_by(id: game_id)
    if game.start_game
      ActionCable.server.broadcast("game_room_channel_#{game_id}", game: render_game(game))
    else
      ActionCable.server.broadcast("game_room_channel_#{game_id}", errors: ['You cannot start this game. Please ensure that there are between 2-5 players and that the game has not already been started'])
    end
  end
  
  def give_clue(params)
    game_id = params['game_id']
    game = Game.find_by(id: game_id)
    hand = Hand.find_by(id: params['hand_id'])
    if game.give_clue(hand, params['clue'])
      binding.pry
      ActionCable.server.broadcast("game_room_channel_#{game_id}", game: render_game(game))
    else
      ActionCable.server.broadcast("game_room_channel_#{game_id}", errors: ['Nah, that clue is BOGUS'])
    end
  end

  private 

  def render_game(game)
    ApplicationController.renderer.render(partial: "games/game.json.jbuilder", locals: { game: game })
  end
  
end
class GamesChannel < ApplicationCable::Channel

  def subscribed
    stream_from "game_channel"
  end

  def unsubscribed
  end

  def create_game(data)
    game = Game.new(title: data['title'])
    if !game.save 
      ActionCable.server.broadcast('game_channel', errors: render_errors(game.errors.messages))
    end
    game.users << current_user
    ActionCable.server.broadcast('game_channel', games: render_games(games))
  end

  def get_games
    games = Game.active_games
    ActionCable.server.broadcast('game_channel', games: render_games(games))
  end

  private 

  def render_games(games)
    ApplicationController.renderer.render(partial: "games/games.json.jbuilder", locals: { games: games })
  end
  
end
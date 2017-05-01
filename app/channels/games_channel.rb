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
  end

  def get_games
    games = Game.all
    ActionCable.server.broadcast('game_channel', games: render_games(games))
  end

  private 

  def render_games(games)
    ApplicationController.renderer.render(partial: "games/games.json.jbuilder", locals: { games: games })
  end
  
end
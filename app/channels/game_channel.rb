class GameChannel < ApplicationCable::Channel

  def subscribed
    stream_from "game_channel"
  end

  def unsubscribed
  end

  def speak(data)
    game = Game.new(title: data['title'])
    if !game.save 
      ActionCable.server.broadcast('game_channel', errors: render_errors(game.errors.messages))
    end
  end

  def get_games
    games = Game.all
    ActionCable.server.broadcast('game_channel', games: render_games(games))
  end

  def get_game(params)
    game = Game.find_by(id: params['id'])
    ActionCable.server.broadcast('game_channel', game: render_game(game))
  end

  private 

    def render_games(games)
      ApplicationController.renderer.render(partial: "games/games.json.jbuilder", locals: { games: games })
    end

    def render_game(game)
      ApplicationController.renderer.render(partial: "games/game.json.jbuilder", locals: { game: game })
    end

    def render_errors(errors) 
      ApplicationController.renderer.render(json: { errors: errors })
    end
  
end
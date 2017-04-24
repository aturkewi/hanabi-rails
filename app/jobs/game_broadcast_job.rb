class GameBroadcastJob < ApplicationJob
  queue_as :default

  def perform(game)
    games = Game.all
    ActionCable.server.broadcast('game_channel', games: render_games(games))
  end

  private
    def render_games(games)
      ApplicationController.renderer.render(partial: "games/games.json.jbuilder", locals: { games: games })
    end
end
class GameBroadcastJob < ApplicationJob
  queue_as :default

  def perform(game)
    ActionCable.server.broadcast('game_channel', game: render_game(game))
  end

  private
    def render_game(game)
      ApplicationController.renderer.render(partial: "games/game.json.jbuilder", locals: { game: game })
    end
end
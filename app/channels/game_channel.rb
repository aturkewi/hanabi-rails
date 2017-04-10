class GameChannel < ApplicationCable::Channel

  def subscribed
    stream_from "game_channel_for_current_user_id#{current_user.id}"
  end

  def unsubscribed
  end

  def speak(data)
    Game.create!(title: data['title'])
  end

  def get_games 
    games = Game.all
    ActionCable.server.broadcast('game_channel', games: render_games(games))
  end

  private 

    def render_games(games)
      ApplicationController.renderer.render(partial: "games/index.json.jbuilder", locals: { games: games })
    end

  
end
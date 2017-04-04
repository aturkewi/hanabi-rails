class Api::GamesController < ApplicationController
  before_action :authenticate_token!

  def create
    @game = Game.new(game_params)
    if @game.save 
      @game.users << current_user
      render 'games/game.json.jbuilder'
    else
      render json: { 
        errors: @game.errors
      }, status: 500
    end
  end

  private 

  def game_params
    params.require(:game).permit(:title)
  end

end

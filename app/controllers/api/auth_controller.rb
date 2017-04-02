class Api::AuthController < ApplicationController
  before_action :authenticate_token!, only: [:refresh]

  def login
    @user = User.find_by(username: params[:user][:username])
    if @user && @user.authenticate(params[:user][:password])
      render 'users/user_with_token.json.jbuilder', user: @user
    else
      render json: { 
        errors: [ { message: 'Incorrect username or password' } ]
      }, status: 500
    end
  end

  def refresh
    render 'users/user_with_token.json.jbuilder', user: @user
  end

end

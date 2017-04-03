class Api::AuthController < ApplicationController
  before_action :authenticate_token!, only: [:refresh]

  def login
    @user = User.find_by(username: params[:user][:username])
    if !@user
      render json: { 
        errors: { username: ['Username is invalid!'] }
      }, status: 500
    elsif @user && @user.authenticate(params[:user][:password])
      render 'users/user_with_token.json.jbuilder', user: @user
    else 
      render json: { 
        errors: { password: ['Password is invalid!'] }
      }, status: 500
    end
  end

  def refresh
    render 'users/user_with_token.json.jbuilder', user: @user
  end

end

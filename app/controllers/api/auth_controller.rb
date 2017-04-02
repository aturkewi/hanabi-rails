class Api::AuthController < ApplicationController

  def login
    user = User.find_by(username: params[:user][:username])
    if user && user.authenticate(params[:user][:password])
      render json: { 
        token: Auth.create_token(user.id), 
        user: user.attributes.except("password_digest") 
      }
    else
      render json: { 
        errors: [ { message: 'Incorrect username or password' } ]
      }, status: 500
    end
  end

end

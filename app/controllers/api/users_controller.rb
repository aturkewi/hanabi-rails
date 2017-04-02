class Api::UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      render json: { 
        token: Auth.create_token(user.id), 
        user: user.attributes.except("password_digest") 
      }
    else
      render json: { 
        errors: user.errors.full_messages 
      }, status: 500
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end

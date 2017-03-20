require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  describe 'GET :create' do
    it 'creates a user and returns a user with a token' do 
      user = build(:user)
      post :create, params: {
        user: {
          username: user.username,
          email: user.email,
          password: user.password
        }
      }
      
      expect(response.user.username).to equal(user.username)
      expect(response.token).to be_a(string)
    end
  end
end

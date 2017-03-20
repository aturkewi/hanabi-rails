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
      
      body = JSON.parse(response.body)

      
      expect(body["user"]["username"]).to eq(user.username)
      expect(body["token"]).not_to eq(nil)
    end
    
    it 'does not return the password' do
      user = build(:user)
      post :create, params: {
        user: {
          username: user.username,
          email: user.email,
          password: user.password
        }
      }
      
      body = JSON.parse(response.body)
      
      expect(body["user"]["password_digest"]).to eq(nil)
      expect(body["user"]["password"]).to eq(nil)
    end
  end
end
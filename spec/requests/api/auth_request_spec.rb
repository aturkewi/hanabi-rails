require 'rails_helper'

RSpec.describe "Users API", type: :request do

  describe "POST /auth" do 

    it "logs in a user and returns the user info with a JWT token" do 
      params = {
        user: {
          username: "billy",
          password: "password"
        }
      }

      post '/api/auth',
        params: params.to_json,
        headers: { 'Content-Type': 'application/json' }

      body = JSON.parse(response.body)
     
      expect(response.status).to eq(200)
      expect(body['token']).not_to eq(nil)
      expect(body['user']["id"]).not_to eq(nil)
      expect(body['password_digets']).to eq(nil)
    end 
  end
end
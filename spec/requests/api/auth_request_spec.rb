require 'rails_helper'

RSpec.describe "Users API", type: :request do

  describe "POST /auth" do 

    describe "on success" do 

      it "logs in a user and returns the user info with a JWT token" do 
        user = create(:user)
        params = {
          user: {
            username: user.username,
            password: user.password
          }
        }

        post '/api/auth',
          params: params.to_json,
          headers: { 'Content-Type': 'application/json' }

        body = JSON.parse(response.body)
      
        expect(response.status).to eq(200)
        expect(body['token']).not_to eq(nil)
        expect(body['user']["id"]).not_to eq(nil)
        expect(body['password_digest']).to eq(nil)
      end 
    end

    describe "on failure" do 

      it "returns an error message" do 
        user = build(:user)
        params = {
          user: {
            username: user.username,
            password: user.password
          }
        }

        post '/api/auth',
          params: params.to_json,
          headers: { 'Content-Type': 'application/json' }

        body = JSON.parse(response.body)
      
        expect(response.status).to eq(500)
        expect(body['errors'][0]['message']).to eq('Incorrect username or password')
      end 
    end
  end

  describe 'POST /auth/refresh' do 

    describe 'on success' do 
      it "returns the user info with a new JWT token" do 

        # binding.pry
        user = create(:user)
        token = Auth.create_token(user.id)
        
        post '/api/auth/refresh',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': "Bearer #{token}"
          }

        body = JSON.parse(response.body)
      
        expect(response.status).to eq(200)
        expect(body['token']).not_to eq(nil)
        expect(body['user']["id"]).to eq(user.id)
      end 
    end 

    describe 'on failure' do 
      it 'returns an error message' do 
        token = 'abc.123.def.456'

        post '/api/auth/refresh',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': "Bearer #{token}"
          }

        body = JSON.parse(response.body)
      
        expect(response.status).to eq(500)
        expect(body['errors'][0]['message']).to eq('A valid token must be passed!')
      end 
    end
  end
end
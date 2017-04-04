require 'rails_helper'

RSpec.describe "Games API", type: :request do

  before(:each) do 
    @user = create(:user)
    @token = Auth.create_token(@user.id)
    @token_headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      'Authorization': "Bearer: #{@token}"
    }
    @tokenless_headers = { "CONTENT_TYPE" => "application/json" }
  end
    
  describe 'POST /games' do 

    it 'requires a token' do 
      params = { game: { title: "Test Game" } }
      post '/api/games', params: params.to_json, headers: @tokenless_headers
      body = JSON.parse(response.body).with_indifferent_access
    
      expect(response).to have_http_status(403)
      expect(body["errors"]).to eq([
        { "message" => "You must include a JWT Token!" }
      ])
    end

    describe 'success' do 

      it 'returns the newly created game' do     
        params = { game: { title: "Test Game" } }
        post '/api/games', params: params.to_json, headers: @token_headers
        body = JSON.parse(response.body).with_indifferent_access

        expect(response.content_type).to eq("application/json")
        expect(response).to have_http_status(200)
        expect(body).to match({
          "id" => be_kind_of(Integer),
          "title" => match(/Test Game/)
        })
      end
    end 

    describe 'failure (due to validations)' do 

      it 'returns a 500 status with error messages' do 
        game = create(:game)
        params = { game: { title: game.title } }
        post '/api/games', params: params.to_json, headers: @token_headers
        body = JSON.parse(response.body).with_indifferent_access

        expect(response.content_type).to eq("application/json")
        expect(response).to have_http_status(500)
        expect(body["errors"]).to eq({ "title" => ["has already been taken"] })
      end 
    end
  end
end
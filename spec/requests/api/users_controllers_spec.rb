require 'rails_helper'

RSpec.describe "Users API", type: :request do

  describe "POST /users" do 

    it "create the specified user" do 
      params = {
        user: {
          first_name: "Bill", 
          last_name: "Murray", 
          username: "billy",
          email: "bill@gmail.com",
          password: "password"
        }
      }

      post '/api/users',
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
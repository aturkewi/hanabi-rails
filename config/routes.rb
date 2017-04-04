Rails.application.routes.draw do

  namespace :api do
    # /api/users
    resources :users, only: [:create]

    # /api/auth
    post '/auth', to: "auth#login"
    post '/auth/refresh', to: "auth#refresh"

    # /api/games
    resources :games, only: [:index, :create]
    post '/games/:id/join', to: "games#join"
  end

end

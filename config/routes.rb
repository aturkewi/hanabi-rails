Rails.application.routes.draw do

  namespace :api do
    resources :users, only: [:create]
    post '/auth', to: "auth#login"
    post '/auth/referesh', to: "auth#refresh"
  end

end

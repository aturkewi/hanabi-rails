Rails.application.routes.draw do

  namespace :api do
    post '/signup', to: "users#signup"
    post '/login', to: "auth#login"
    post '/auth/referesh', to: "auth#refresh"
  end

end

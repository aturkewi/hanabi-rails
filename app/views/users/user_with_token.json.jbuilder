json.user do 
  json.(@user, :id, :username, :email, :first_name, :last_name)
end
json.token(Auth.create_token(@user.id))
json.games games do |game|
  json.(game, :id, :title, :status)

  json.users game.users do | user |
    json.username user.username
  end
end

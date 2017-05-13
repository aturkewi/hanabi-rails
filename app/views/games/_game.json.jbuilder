json.(game, :id, :title, :status)

json.game_cards game.game_cards do |card|
  json.(card, :id)
end

json.users game.users do | user |
  json.(user, :id, :username)
end

json.hands game.hands do | hand |
  json.(hand, :user_id)
  
  json.game_cards hand.game_cards do | card |
    json.(card, :id)
  end
end


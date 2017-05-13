json.(game, :id, :title, :status)

json.game_cards game.game_cards do |card|
  json.(card, :id)
end

json.hands game.hands do | hand |
  
  json.user do
    json.id hand.user.id
    json.username hand.user.username
  end
  
  json.game_cards hand.game_cards do | card |
    json.(card, :id)
  end
end


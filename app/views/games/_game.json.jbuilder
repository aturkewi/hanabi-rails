json.(game, :id, :title, :status)

json.deck game.deck do |card|
  json.(card, :id, :color, :number)
end

json.hands game.hands do | hand |
  
  json.user do
    json.id hand.user.id
    json.username hand.user.username
  end
  
  json.cards hand.game_cards do | card |
    json.(card, :id, :color, :number)
  end
end


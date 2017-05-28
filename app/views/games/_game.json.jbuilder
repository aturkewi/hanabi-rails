json.(game, :id, :title, :status, :miss_counter, :clue_counter)

json.deck game.deck do |card|
  json.(card, :id, :color, :number)
end

json.hands game.hands do | hand |
  
  json.id hand.id
  
  json.user do
    json.id hand.user.id
    json.username hand.user.username
  end
  
  json.cards hand.game_cards do | card |
    json.(card, :id, :color, :number)
  end
end


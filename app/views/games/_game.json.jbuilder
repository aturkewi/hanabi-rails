json.(game, :id, :title, :status) 
json.game_cards game.game_cards do |card|
  json.(card, :id)
end


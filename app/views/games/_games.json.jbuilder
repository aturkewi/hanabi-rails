json.games games do |game|
  json.(game, :id, :title, :status)
end

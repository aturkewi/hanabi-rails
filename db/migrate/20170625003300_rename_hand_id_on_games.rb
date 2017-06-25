class RenameHandIdOnGames < ActiveRecord::Migration[5.0]
  def change
    rename_column :games, :hand_id, :current_player_id
  end
end

class AddStatusToGames < ActiveRecord::Migration[5.0]
  def change
    add_column :games, :status, :integer, default: 0, null: false
  end
end

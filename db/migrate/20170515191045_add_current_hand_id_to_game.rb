class AddCurrentHandIdToGame < ActiveRecord::Migration[5.0]
  def change
    add_column :games, :hand_id, :integer
  end
end

class AddCluesAndMissesToGame < ActiveRecord::Migration[5.0]
  def change
    add_column :games, :clue_counter, :integer, default: 8
    add_column :games, :miss_counter, :integer, default: 3
  end
end

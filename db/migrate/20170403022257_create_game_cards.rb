class CreateGameCards < ActiveRecord::Migration[5.0]
  def change
    create_table :game_cards do |t|
      t.references :game, foreign_key: true
      t.references :hand, foreign_key: true
      t.integer :location
      t.boolean :display_color, default: false
      t.boolean :display_number, default: false
      t.string :color
      t.integer :number

      t.timestamps
    end
  end
end

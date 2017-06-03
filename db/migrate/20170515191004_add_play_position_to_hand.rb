class AddPlayPositionToHand < ActiveRecord::Migration[5.0]
  def change
    add_column :hands, :play_posotion, :integer
  end
end

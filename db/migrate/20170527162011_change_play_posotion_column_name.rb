class ChangePlayPosotionColumnName < ActiveRecord::Migration[5.0]
  def change
    rename_column :hands, :play_posotion, :play_position
  end
end

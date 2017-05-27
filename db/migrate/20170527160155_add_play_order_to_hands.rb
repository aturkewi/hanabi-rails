class AddPlayOrderToHands < ActiveRecord::Migration[5.0]
  def change
    add_column :hands, :play_order, :integer
  end
end

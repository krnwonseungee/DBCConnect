class AddActiveInUsers < ActiveRecord::Migration
  def change
    add_column :users, :active, :boolean, default: false
    add_index :users, :active
  end
end


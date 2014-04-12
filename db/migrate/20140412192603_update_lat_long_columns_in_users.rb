class UpdateLatLongColumnsInUsers < ActiveRecord::Migration
  def change
    add_column :users, :latitude, :float
    add_column :users, :longitude, :float
    remove_column :users, :lat, :string
    remove_column :users, :lon, :string
  end
end

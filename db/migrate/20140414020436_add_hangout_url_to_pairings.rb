class AddHangoutUrlToPairings < ActiveRecord::Migration
  def change
    add_column :pairings, :hangout_url, :text
  end
end

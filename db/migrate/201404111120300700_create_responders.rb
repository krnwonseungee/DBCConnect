class CreateResponders < ActiveRecord::Migration
  def change
    create_table :responders do |t|
      t.belongs_to :user
      t.text :feedback
      
      t.timestamps
    end
  end
end
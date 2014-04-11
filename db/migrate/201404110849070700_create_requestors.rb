class CreateRequestors < ActiveRecord::Migration
  def change
    create_table :requestors do |t|
      t.belongs_to :user
      t.text :feedback
      
      t.timestamps
    end
  end
end
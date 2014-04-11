class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :first_name
      t.string :last_name
      t.string :position
      t.string :company
      t.string :location
      t.string :picture_url
      t.integer :cohort_id
      t.text :bio
      t.var


      t.timestamps
    end
  end
end

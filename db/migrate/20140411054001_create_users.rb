class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.belongs_to :cohort
      t.string :name
      t.string :email
      t.text :bio
      t.string :role
      t.text :github
      t.text :quora
      t.text :twitter
      t.text :facebook
      t.text :linked_in
      t.text :blog
      t.text :about
      t.string :hometown
      t.string :current_location
      t.string :first_name
      t.string :last_name
      t.string :position
      t.string :lat
      t.string :lon
      t.string :company
      t.string :location
      t.string :picture_url
      t.integer :cohort_id
      t.timestamps
    end
  end
end


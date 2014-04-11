class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :dbc_user_id
      t.string :name
      t.string :email
      t.text :bio
      t.integer :dbc_cohort_id
      t.string :role
      t.string :github
      t.string :quora
      t.string :twitter
      t.string :facebook
      t.string :linked_in
      t.string :blog
      t.string :about
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


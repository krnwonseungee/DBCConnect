class CreateCohorts < ActiveRecord::Migration
  def change
    create_table :cohorts do |t|
      t.integer :dbc_cohort_id
      t.string :name
      t.string :location
      t.datetime :start_date
      t.string :email
    end
  end
end


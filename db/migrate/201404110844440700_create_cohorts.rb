class CreateCohorts < ActiveRecord::Migration
  def change
    create_table :cohorts do |t|
      # YOu've allocated 256 characters for each of these.  WAs that necessary?
      t.string :name
      t.string :email
      t.string :location
      t.date :start_date
      t.boolean :in_session

      t.timestamps
    end
  end
end

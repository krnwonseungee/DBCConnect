class CreatePairings < ActiveRecord::Migration
  def change
    create_table :pairings do |t|
      t.belongs_to :requestor
      t.belongs_to :responder

      t.timestamps
    end
  end
end

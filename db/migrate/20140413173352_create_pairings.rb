class CreatePairings < ActiveRecord::Migration
  def change
    create_table :pairings do |t|
      t.integer :requestor_id
      t.index :requestor_id
      t.integer :responder_id
      t.index :responder_id
      t.text :requestor_feedback
      t.text :responder_feedback
      t.timestamps
    end
  end
end

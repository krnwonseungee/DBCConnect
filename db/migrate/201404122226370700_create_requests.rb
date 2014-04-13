class CreateRequests < ActiveRecord::Migration
  def change
    create_table :requests do |t|
      t.integer :responder_id
      t.belongs_to :user #the requestor
    end
  end
end
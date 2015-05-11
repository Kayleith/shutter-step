class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.string :description
      t.string :url, null: false
      t.integer :lat, null: false
      t.integer :lng, null: false
      t.timestamps null: false
    end
    add_index :pictures, :lat
    add_index :pictures, :lng
    add_index :pictures, :user_id
  end
end

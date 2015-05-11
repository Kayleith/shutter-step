# Schema Information

create_table "pictures", force: :cascade do |t|
  t.integer  "user_id",     null: false
  t.string   "title",       null: false
  t.string   "description"
  t.string   "url",         null: false
  t.integer  "lat",         null: false
  t.integer  "lng",         null: false
  t.datetime "created_at",  null: false
  t.datetime "updated_at",  null: false
end

add_index "pictures", ["lat"], name: "index_pictures_on_lat", using: :btree
add_index "pictures", ["lng"], name: "index_pictures_on_lng", using: :btree
add_index "pictures", ["user_id"], name: "index_pictures_on_user_id", using: :btree

create_table "users", force: :cascade do |t|
  t.string   "first_name",      null: false
  t.string   "last_name",       null: false
  t.string   "username",        null: false
  t.string   "email",           null: false
  t.date     "birthday",        null: false
  t.string   "sex",             null: false
  t.string   "password_digest", null: false
  t.string   "session_token",   null: false
  t.datetime "created_at",      null: false
  t.datetime "updated_at",      null: false
end

add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
add_index "users", ["first_name"], name: "index_users_on_first_name", using: :btree
add_index "users", ["last_name"], name: "index_users_on_last_name", using: :btree
add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

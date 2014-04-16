# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 201404122226370700) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cohorts", force: true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "location"
    t.date     "start_date"
    t.boolean  "in_session"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pairings", force: true do |t|
    t.integer  "requestor_id"
    t.integer  "responder_id"
    t.text     "requestor_feedback"
    t.text     "responder_feedback"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "hangout_url"
  end

  add_index "pairings", ["requestor_id"], name: "index_pairings_on_requestor_id", using: :btree
  add_index "pairings", ["responder_id"], name: "index_pairings_on_responder_id", using: :btree

  create_table "pg_search_documents", force: true do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "quotes", force: true do |t|
    t.string "content"
    t.string "author"
  end

  create_table "requests", force: true do |t|
    t.integer "responder_id"
    t.integer "user_id"
  end

  create_table "users", force: true do |t|
    t.integer  "cohort_id"
    t.string   "name"
    t.string   "email"
    t.text     "bio"
    t.string   "role"
    t.text     "github"
    t.text     "quora"
    t.text     "twitter"
    t.text     "facebook"
    t.text     "linked_in"
    t.text     "blog"
    t.text     "about"
    t.string   "hometown"
    t.string   "current_location"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "position"
    t.string   "company"
    t.string   "location"
    t.string   "picture_url"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "latitude"
    t.float    "longitude"
    t.boolean  "active",           default: false
  end

  add_index "users", ["active"], name: "index_users_on_active", using: :btree

end

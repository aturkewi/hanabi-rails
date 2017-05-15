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

ActiveRecord::Schema.define(version: 20170515191045) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "game_cards", force: :cascade do |t|
    t.integer  "game_id"
    t.integer  "hand_id"
    t.integer  "location",       default: 0,     null: false
    t.boolean  "display_color",  default: false
    t.boolean  "display_number", default: false
    t.string   "color"
    t.integer  "number"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.index ["game_id"], name: "index_game_cards_on_game_id", using: :btree
    t.index ["hand_id"], name: "index_game_cards_on_hand_id", using: :btree
  end

  create_table "games", force: :cascade do |t|
    t.string   "title",                  null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "status",     default: 0, null: false
    t.integer  "hand_id"
  end

  create_table "hands", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "game_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "play_posotion"
    t.index ["game_id"], name: "index_hands_on_game_id", using: :btree
    t.index ["user_id"], name: "index_hands_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "username"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_foreign_key "game_cards", "games"
  add_foreign_key "game_cards", "hands"
  add_foreign_key "hands", "games"
  add_foreign_key "hands", "users"
end

# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 20_221_022_131_756) do
  create_table 'kit_components', force: :cascade do |t|
    t.integer('product_id', null: false)
    t.string('name')
    t.datetime('created_at', null: false)
    t.datetime('updated_at', null: false)
    t.index(['product_id'], name: 'index_kit_components_on_product_id')
  end

  create_table 'kit_products', force: :cascade do |t|
    t.string('name')
    t.datetime('created_at', null: false)
    t.datetime('updated_at', null: false)
  end

  add_foreign_key 'kit_components', 'kit_products', column: 'product_id'
end

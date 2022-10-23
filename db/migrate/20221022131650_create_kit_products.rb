# frozen_string_literal: true

class CreateKitProducts < ActiveRecord::Migration[7.0]
  def change
    create_table(:kit_products) do |t|
      t.string(:name)

      t.timestamps
    end
  end
end

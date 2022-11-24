# frozen_string_literal: true

class CreateKitComponents < ActiveRecord::Migration[7.0]
  def change
    create_table(:kit_components) do |t|
      t.references(:kit_product, null: false, foreign_key: true)
      t.string(:name)

      t.timestamps
    end
  end
end

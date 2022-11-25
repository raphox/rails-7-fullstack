# frozen_string_literal: true

class CreateKitComponents < ActiveRecord::Migration[7.0]
  def change
    create_table(:kit_components) do |t|
      t.references(:product, null: false, foreign_key: { to_table: :kit_products })
      t.string(:name)

      t.timestamps
    end
  end
end

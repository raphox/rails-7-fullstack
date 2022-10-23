# frozen_string_literal: true

json.extract!(kit_product, :id, :name, :created_at, :updated_at)
json.url(api_kit_product_url(kit_product, format: :json))

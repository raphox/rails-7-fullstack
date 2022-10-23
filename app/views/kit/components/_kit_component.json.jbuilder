# frozen_string_literal: true

json.extract!(kit_component, :id, :product_id, :name, :created_at, :updated_at)
json.url(kit_component_url(kit_component, format: :json))

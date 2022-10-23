# frozen_string_literal: true

json.array!(@kit_products, partial: 'kit/products/product', as: :kit_product)

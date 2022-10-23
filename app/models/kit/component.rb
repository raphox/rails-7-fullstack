# frozen_string_literal: true

module Kit
  class Component < ApplicationRecord
    belongs_to :product
  end
end

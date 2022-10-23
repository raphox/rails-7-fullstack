# frozen_string_literal: true

module Kit
  class Product < ApplicationRecord
    validates :name, presence: true

    has_many :components, class_name: 'Kit::Component', dependent: :destroy
  end
end

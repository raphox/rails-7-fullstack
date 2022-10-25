# frozen_string_literal: true

class SearchListComponent < ViewComponent::Base
  renders_one :form, SearchListFormComponent
  renders_many :items, SearchListItemComponent
end

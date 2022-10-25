# frozen_string_literal: true

class SearchListComponent < ViewComponent::Base
  include Turbo::FramesHelper

  renders_one :form, SearchListFormComponent
  renders_many :items, SearchListItemComponent

  def before_render
    @resource = form.ransack.object.model_name
  end
end

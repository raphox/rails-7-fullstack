# frozen_string_literal: true

require 'ransack/helpers'

module SearchListFormHelper
  def form_tag(options = {}, &)
    options.merge!({ builder: SearchListBuilder })

    search_form_for(@ransack, options, &)
  end
end

class SearchListFormComponent < ViewComponent::Base
  include Ransack::Helpers::FormHelper
  include SearchListFormHelper

  attr_reader :ransack

  def before_render
    @search_value = params[@search_field]
  end

  def initialize(ransack:, search_field: :name_cont)
    @ransack = ransack
    @search_field = search_field

    @resource = ransack.object.model_name
  end
end

class SearchListBuilder < ActionView::Helpers::FormBuilder
  include SearchListFormHelper

  def button(tag_value = nil, options = {}, &)
    options.merge!({
      type: 'submit',
      class: 'absolute inset-0 right-auto group',
    })

    @template.button_tag(
      tag_value, options, &
    )
  end

  def input_search(method, _tag_value, options = {})
    options.merge!({
      placeholder: 'Search...',
      class: 'form-input w-full pl-9 focus:border-slate-300',
    })

    @template.label(@object_name, method, class: 'sr-only') +
      @template.search_field(@object_name, method, options)
  end
end

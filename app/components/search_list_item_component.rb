# frozen_string_literal: true

class SearchListItemComponent < ViewComponent::Base
  include Turbo::FramesHelper

  def initialize(item, label: :name)
    @item = item
    @label = item.send(label)
  end

  def active?
    @item.persisted? && current_page?(kit_product_path(@item))
  end

  def call
    html_options = {
      aria: { label: "Edit this #{@item.model_name.singular}" },
      data: {
        turbo_frame: "#{@item.model_name.singular}_form",
        action: 'click->search-list#selectItem',
        search_list_target: 'item',
      },
      class: class_names(
        'flex items-center justify-between w-full p-2 rounded', {
          'bg-indigo-100': active?,
          'text-slate-300': @item.new_record?,
        }
      ),
    }

    turbo_frame_tag dom_id(@item, 'list') do
      content_tag :li, class: '-mx-2' do
        link_to_if(@item.persisted?, item_tag, @item, html_options) do
          content_tag :span, item_tag, html_options.except(:data)
        end
      end
    end
  end

  private

  def item_tag
    content_tag :div, class: 'flex items-center truncate' do
      content_tag :div, class: 'truncate' do
        content_tag :div, @label, class: 'text-sm font-medium'
      end
    end
  end
end

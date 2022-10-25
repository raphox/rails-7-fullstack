# frozen_string_literal: true

class SearchListItemComponent < ViewComponent::Base
<<<<<<< HEAD
  include Turbo::FramesHelper

=======
>>>>>>> main
  def initialize(item, label: :name)
    @item = item
    @label = item.send(label)
  end

  def active?
    current_page?(kit_product_path(@item))
  end

  def call
    html_options = {
      aria: { label: "Edit this #{@item.model_name.singular}" },
      data: { turbo_frame: "#{@item.model_name.singular}_form" } ,
      class: class_names(
        "flex items-center justify-between w-full p-2 rounded", {
          "bg-indigo-100": active?
        }
      )
    }

    turbo_frame_tag dom_id(@item, 'list') do
      content_tag :li, class: "-mx-2" do
        link_to @item, html_options do
          content_tag :div, class: "flex items-center truncate" do
            content_tag :div, class: "truncate" do
              content_tag :div, @label, class: "text-sm font-medium text-slate-800"
            end
          end
        end
      end
    end
  end
end

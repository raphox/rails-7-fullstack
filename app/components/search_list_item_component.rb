# frozen_string_literal: true

class SearchListItemComponent < ViewComponent::Base
  def initialize(item, label: :name)
    @item = item
    @label = item.send(label)
  end

  def active?
    current_page?(kit_product_path(@item))
  end

  def call
    html_options = {
      aria: { label: "Edit this #{@item.model_name.human.downcase}" },
      class: class_names(
        "flex items-center justify-between w-full p-2 rounded", {
          "bg-indigo-100": active?
        }
      )
    }

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

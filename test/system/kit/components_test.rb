# frozen_string_literal: true

require 'application_system_test_case'

module Kit
  class ComponentsTest < ApplicationSystemTestCase
    setup do
      @kit_component = kit_components(:one)
    end

    test 'visiting the index' do
      visit kit_components_url
      assert_selector 'h1', text: 'Components'
    end

    test 'should create component' do
      visit kit_components_url
      click_on 'New component'

      fill_in 'Name', with: @kit_component.name
      fill_in 'Product', with: @kit_component.product_id
      click_on 'Create Component'

      assert_text 'Component was successfully created'
      click_on 'Back'
    end

    test 'should update Component' do
      visit kit_component_url(@kit_component)
      click_on 'Edit this component', match: :first

      fill_in 'Name', with: @kit_component.name
      fill_in 'Product', with: @kit_component.product_id
      click_on 'Update Component'

      assert_text 'Component was successfully updated'
      click_on 'Back'
    end

    test 'should destroy Component' do
      visit kit_component_url(@kit_component)
      click_on 'Destroy this component', match: :first

      assert_text 'Component was successfully destroyed'
    end
  end
end

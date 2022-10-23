# frozen_string_literal: true

require 'test_helper'

module Kit
  class ComponentsControllerTest < ActionDispatch::IntegrationTest
    setup do
      @kit_component = kit_components(:one)
    end

    test 'should get index' do
      get kit_components_url
      assert_response :success
    end

    test 'should get new' do
      get new_kit_component_url
      assert_response :success
    end

    test 'should create kit_component' do
      assert_difference('Kit::Component.count') do
        post kit_components_url,
             params: { kit_component: { name: @kit_component.name, product_id: @kit_component.product_id } }
      end

      assert_redirected_to kit_component_url(Kit::Component.last)
    end

    test 'should show kit_component' do
      get kit_component_url(@kit_component)
      assert_response :success
    end

    test 'should get edit' do
      get edit_kit_component_url(@kit_component)
      assert_response :success
    end

    test 'should update kit_component' do
      patch kit_component_url(@kit_component),
            params: { kit_component: { name: @kit_component.name, product_id: @kit_component.product_id } }
      assert_redirected_to kit_component_url(@kit_component)
    end

    test 'should destroy kit_component' do
      assert_difference('Kit::Component.count', -1) do
        delete kit_component_url(@kit_component)
      end

      assert_redirected_to kit_components_url
    end
  end
end

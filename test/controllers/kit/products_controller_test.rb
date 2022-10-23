# frozen_string_literal: true

require 'test_helper'

module Kit
  class ProductsControllerTest < ActionDispatch::IntegrationTest
    setup do
      @kit_product = kit_products(:one)
    end

    test 'should get index' do
      get kit_products_url
      assert_response :success
    end

    test 'should get new' do
      get new_kit_product_url
      assert_response :success
    end

    test 'should create kit_product' do
      assert_difference('Kit::Product.count') do
        post kit_products_url, params: { kit_product: { name: @kit_product.name } }
      end

      assert_redirected_to kit_product_url(Kit::Product.last)
    end

    test 'should show kit_product' do
      get kit_product_url(@kit_product)
      assert_response :success
    end

    test 'should get edit' do
      get edit_kit_product_url(@kit_product)
      assert_response :success
    end

    test 'should update kit_product' do
      patch kit_product_url(@kit_product), params: { kit_product: { name: @kit_product.name } }
      assert_redirected_to kit_product_url(@kit_product)
    end

    test 'should destroy kit_product' do
      assert_difference('Kit::Product.count', -1) do
        delete kit_product_url(@kit_product)
      end

      assert_redirected_to kit_products_url
    end
  end
end

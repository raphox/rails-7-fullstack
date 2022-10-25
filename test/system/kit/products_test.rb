# frozen_string_literal: true

require 'application_system_test_case'

module Kit
  class ProductsTest < ApplicationSystemTestCase
    setup do
      @kit_product = kit_products(:one)
    end

    test 'visiting the index' do
      visit kit_products_url
      assert_selector 'h1', text: 'Products'
    end

    test 'should create product' do
      visit kit_products_url
      click_on 'New product'

      fill_in 'Name', with: @kit_product.name
      click_on 'Create Product'

      assert_text 'Product was successfully created'
      click_on 'Back'
    end

    test 'should update Product' do
      visit kit_product_url(@kit_product)
      click_on 'Edit this kit_product', match: :first

      fill_in 'Name', with: @kit_product.name
      click_on 'Update Product'

      assert_text 'Product was successfully updated'
      click_on 'Back'
    end

    test 'should destroy Product' do
      visit kit_product_url(@kit_product)

      message =
        accept_alert do
          click_on('Destroy this product', match: :first)
        end

      assert_equal message, 'Are you sure?'
      assert_text 'Product was successfully destroyed'
    end
  end
end

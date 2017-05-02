import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'; 
import Product from '../src/Product';
import { mount } from 'enzyme';

describe('Product', function () {
  const param1 = {
    attributes: {
      name: 'productA',
      category: 'categoryA',
      price: 12300,
      sale_price: 32100,
      sold_out: true,
      under_sale: true
    },
  };

  const param2 = {
    attributes: {
      name: 'productB',
      category: 'categoryB',
      price: 45600,
      sale_price: 65400,
      sold_out: false,
      under_sale: false
    },
  };

  it('renders without problems', function () {
    var product = ReactTestUtils.renderIntoDocument(<Product product={param1} type="single"/>);
    expect(product).toBeDefined();
  });

  it('is viewed from single product', function() {
    const wrapper = mount(
      <Product product={param1} type="single"/>
    );
    expect(wrapper.find('.viewButton').text()).toBe('X');
    expect(wrapper.find('.product').text()).toContain('productA');
    expect(wrapper.find('.product').text()).toContain('categoryA');
    expect(wrapper.find('.product').text()).toContain('$123');
    expect(wrapper.find('.product').text()).toContain('Sale Price: $321');
    expect(wrapper.find('.product').text()).toContain('Out of Stock');
  });

  it('is viewed from multiple products', function() {
    const wrapper = mount(
      <Product product={param2} type="multiple"/>
    );
    expect(wrapper.find('.viewButton').text()).toBe('View');
    expect(wrapper.find('.product').text()).toContain('productB');
    expect(wrapper.find('.product').text()).toContain('categoryB');
    expect(wrapper.find('.product').text()).toContain('$456');
    expect(wrapper.find('.product').text()).not.toContain('Not for Sell');
    expect(wrapper.find('.product').text()).not.toContain('Sale Price: $543');
  });
});
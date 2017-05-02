import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'; 
import App from '../src/App';
import { mount } from 'enzyme';

describe('App', function () {
  it('renders without problems', function () {
    var app = ReactTestUtils.renderIntoDocument(<App/>);
    expect(app).toBeDefined();
  });

  const app = mount(
    <App/>
  );

  const linkParams = {
    first: "https://test?page%5Bnumber%5D=1&page%5Bsize%5D=30",
    last: "https://test?page%5Bnumber%5D=7&page%5Bsize%5D=30",
    next: "https://test?page%5Bnumber%5D=3&page%5Bsize%5D=30",
    prev: "https://test?page%5Bnumber%5D=1&page%5Bsize%5D=30",
    self: "https://test?page%5Bnumber%5D=2&page%5Bsize%5D=30"
  }

  const dummyProducts = [
    {
      attributes: {
        name: 'productA',
        category: 'categoryA',
        price: 12300,
        sale_price: 32100,
        sold_out: true,
        under_sale: true
      },
      id: '1',
      type: 'products'
    },
    {
      attributes: {
        name: 'productB',
        category: 'categoryB',
        price: 45600,
        sale_price: 65400,
        sold_out: false,
        under_sale: false
      },
      id: '2',
      type: 'products'
    }
  ]
  
  it('can view all products in the current page', function() {
    app.setState({products: dummyProducts});
    expect(app.find('.contentContainer').text()).toContain('productA');
    expect(app.find('.contentContainer').text()).toContain('productB');
  });

  it('will change page size selection when new page size is selected', function() {
    app.find('#view').simulate('change', {target: {value: 60}});
    expect(app.state('view')).toBe(60);
  });

  it('will change price sort selection when new option is selected', function() {
    app.find('#sort').simulate('change', {target: {value: 'highToLow'}});
    expect(app.state('sort')).toBe('highToLow');
  });

  it('will change category selection when new category option is selected', function() {
    app.find('#category').simulate('change');
    app.find('#brushes').simulate('change', {target: {value: 'brushes'}});
    expect(app.state('category')[0]).toBe('brushes');
    expect(app.state('category')[1]).toBeUndefined();
  });

  it('will change price selection when new price option is selected', function() {
    app.find('#price').simulate('change');
    app.find('#3000').simulate('change', {target: {value: 3000}});
    expect(app.state('price')).toBe(3000);
  });

  it('will change page when next page is clicked', function() {
    app.setState({links: linkParams});
    app.find('#next_btn').simulate('click');
    expect(app.state('page')).toBe(3);
  });

  it('will change page when prev page is clicked', function() {
    app.setState({links: linkParams});
    app.find('#prev_btn').simulate('click');
    expect(app.state('page')).toBe(1);
  });

  it('will change page when last page is clicked', function() {
    app.setState({links: linkParams});
    app.find('#last_btn').simulate('click');
    expect(app.state('page')).toBe(7);
  });

  it('will change page when first page is clicked', function() {
    app.setState({links: linkParams});
    app.find('#first_btn').simulate('click');
    expect(app.state('page')).toBe(1);
  });
});
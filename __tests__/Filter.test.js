import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'; 
import Filter from '../src/Filter';
import { mount } from 'enzyme';

describe('Filter', function () {
  const categoryParams = {
    options: [
      {value: 'brushes', placeholder: 'Brushes'},
      {value: 'tools', placeholder: 'Tools'},
      {value: 'markup', placeholder: 'Markup'}
    ],
    input: 'checkbox',
    type: 'category',
    placeholder: 'Category'
  };

  const priceParams = {
    options: [
      {value: 1500, placeholder: 'Under $15'},
      {value: 3000, placeholder: 'Under $30'},
      {value: 5000, placeholder: 'Under $50'},
      {value: 10000, placeholder: 'Under $100'},
      {value: 25000, placeholder: 'Under $250'},
      {value: 100000, placeholder: 'Under $1000'}
    ],
    input: 'radio',
    type: 'price',
    placeholder: 'Price'
  };

  it('renders without problems', function () {
    var filter = ReactTestUtils.renderIntoDocument(<Filter params={categoryParams}/>);
    expect(filter).toBeDefined();
  });

  it('cannot see options initially', function() {
    const wrapper = mount(
      <Filter params={categoryParams} />
    );
    const brushes = wrapper.find('#brushes');
    expect(brushes.exists()).toBe(false);
  });

  it('toggles to reveal options', function() {
    const wrapper = mount(
      <Filter params={categoryParams} />
    );
    wrapper.setState({selected: true});
    const brushes = wrapper.find('#brushes');
    expect(brushes.exists()).toBe(true);
  });

  it('is callback for single chosen category', function() {
    const callBack = jest.fn();
    const wrapper = mount(
      <Filter params={categoryParams} callBack={callBack}/>
    );
    wrapper.setState({selected: true});
    const brushes = wrapper.find('#brushes');
    brushes.simulate('change', {target: {value: 'brushes'}});
    expect(callBack).toBeCalledWith('category', ['brushes']);
  });

  it('is callback for multiple chosen categories', function() {
    const callBack = jest.fn();
    const wrapper = mount(
      <Filter params={categoryParams} callBack={callBack}/>
    );
    wrapper.setState({selected: true});
    const brushes = wrapper.find('#brushes');
    const tools = wrapper.find('#tools');
    brushes.simulate('change', {target: {value: 'brushes'}});
    tools.simulate('change', {target: {value: 'tools'}});
    expect(callBack).toBeCalledWith('category', ['brushes', 'tools']);
  });

  it('is callback for selected price', function() {
    const callBack = jest.fn();
    const wrapper = mount(
      <Filter params={priceParams} callBack={callBack}/>
    );
    wrapper.setState({selected: true});
    wrapper.find('#3000').simulate('change', {target: {value: '3000'}});
    expect(callBack).toBeCalledWith('price', '3000');
  });

  it('is not callback for non selected price', function() {
    const callBack = jest.fn();
    const wrapper = mount(
      <Filter params={priceParams} callBack={callBack}/>
    );
    wrapper.setState({selected: true});
    wrapper.find('#3000').simulate('change', {target: {value: '3000'}});
    expect(callBack).not.toBeCalledWith('price', '1500');
  });
});
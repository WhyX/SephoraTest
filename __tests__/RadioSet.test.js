import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'; 
import RadioSet from '../src/RadioSet';
import { mount } from 'enzyme';

describe('RadioSet', function () {
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
    var radioSet = ReactTestUtils.renderIntoDocument(<RadioSet params={priceParams}/>);
    expect(radioSet).toBeDefined();
  });

  it('is callback for selected price', function() {
    const callBack = jest.fn();
    const wrapper = mount(
      <RadioSet params={priceParams} callBack={callBack}/>
    );
    wrapper.find('#3000').simulate('change', {target: {value: '3000'}});
    expect(callBack).toBeCalledWith('3000');
  });

  it('is not callback for non selected price', function() {
    const callBack = jest.fn();
    const wrapper = mount(
      <RadioSet params={priceParams} callBack={callBack}/>
    );
    wrapper.find('#3000').simulate('change', {target: {value: '3000'}});
    expect(callBack).not.toBeCalledWith('1500');
  });
});
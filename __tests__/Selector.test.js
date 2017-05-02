import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'; 
import Selector from '../src/Selector';
import { mount } from 'enzyme';

describe('Selector', function () {
  const sortParams = {
      options: [
        {value: 'none', placeholder: 'None'},
        {value: 'lowToHigh', placeholder: 'Price: Low to High'},
        {value: 'highToLow', placeholder: 'Price: High to Low'}
      ],
      type: 'sort',
      placeholder: 'Price'
    };
  it('renders without problems', function () {
    var selector = ReactTestUtils.renderIntoDocument(<Selector params={sortParams}/>);
    expect(selector).toBeDefined();
  });

  it('is callback for selected option', function() {
    const callBack = jest.fn();
    const wrapper = mount(
      <Selector params={sortParams} callBack={callBack}/>
    );
    const select = wrapper.find('select');
    select.simulate('change', {target: {value: 'lowToHigh'}});

    expect(callBack).toBeCalledWith('sort', 'lowToHigh');
  });

  it('is not callback for non selected option', function() {
    const callBack = jest.fn();
    const wrapper = mount(
      <Selector params={sortParams} callBack={callBack}/>
    );
    const select = wrapper.find('select');
    select.simulate('change', {target: {value: 'lowToHigh'}});

    expect(callBack).not.toBeCalledWith('sort', 'highToLow');
  });
});
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'; 
import CheckboxSet from '../src/CheckboxSet';
import { mount } from 'enzyme';

describe('CheckboxSet', function () {
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
  it('renders without problems', function () {
    var checkboxSet = ReactTestUtils.renderIntoDocument(<CheckboxSet params={categoryParams}/>);
    expect(checkboxSet).toBeDefined();
  });

  it('is checked for single category', function() {
    const callBack = jest.fn();
    const wrapper = mount(
      <CheckboxSet params={categoryParams} callBack={callBack}/>
    );
    const brushes = wrapper.find('#brushes');
    brushes.simulate('change', {target: {value: 'brushes'}});
    const selectedValues = Array.from(wrapper.instance().selectedValues);
    expect(selectedValues[0]).toBe('brushes');
    expect(selectedValues[1]).toBeUndefined();
  });

  it('is checked for multiple categories', function() {
    const callBack = jest.fn();
    const wrapper = mount(
      <CheckboxSet params={categoryParams} callBack={callBack}/>
    );
    const brushes = wrapper.find('#brushes');
    const tools = wrapper.find('#tools');
    brushes.simulate('change', {target: {value: 'brushes'}});
    tools.simulate('change', {target: {value: 'tools'}});
    const selectedValues = Array.from(wrapper.instance().selectedValues);
    expect(selectedValues[0]).toBe('brushes');
    expect(selectedValues[1]).toBe('tools');
    expect(selectedValues[2]).toBeUndefined();
  });
});
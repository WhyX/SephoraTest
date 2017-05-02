import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'; 
import Pagination from '../src/Pagination';
import { mount } from 'enzyme';

describe('Pagination', function () {
  const pageParams = {
    type: 'page',
    links: {
      first: "https://test?page%5Bnumber%5D=1&page%5Bsize%5D=30",
      last: "https://test?page%5Bnumber%5D=7&page%5Bsize%5D=30",
      next: "https://test?page%5Bnumber%5D=3&page%5Bsize%5D=30",
      prev: "https://test?page%5Bnumber%5D=1&page%5Bsize%5D=30",
      self: "https://test?page%5Bnumber%5D=2&page%5Bsize%5D=30"
    }
  }

  it('renders without problems', function () {
    var pagination = ReactTestUtils.renderIntoDocument(<Pagination params={pageParams}/>);
    expect(pagination).toBeDefined();
  });

  it('is callback for selected next', function() {
    const callBack = jest.fn();
    const wrapper = mount(
      <Pagination params={pageParams} callBack={callBack}/>
    );
    wrapper.find('#next_btn').simulate('click');

    expect(callBack).toBeCalledWith('page', 3);
  });

  it('is callback for selected prev', function() {
    const callBack = jest.fn();
    const wrapper = mount(
      <Pagination params={pageParams} callBack={callBack}/>
    );
    wrapper.find('#prev_btn').simulate('click');

    expect(callBack).toBeCalledWith('page', 1);
  });

  it('is callback for selected first', function() {
    const callBack = jest.fn();
    const wrapper = mount(
      <Pagination params={pageParams} callBack={callBack}/>
    );
    wrapper.find('#first_btn').simulate('click');

    expect(callBack).toBeCalledWith('page', 1);
  });

  it('is callback for selected last', function() {
    const callBack = jest.fn();
    const wrapper = mount(
      <Pagination params={pageParams} callBack={callBack}/>
    );
    wrapper.find('#last_btn').simulate('click');

    expect(callBack).toBeCalledWith('page', 7);
  });
});
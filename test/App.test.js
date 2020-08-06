import React from 'react';
import App from '../src/components/App';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Basic testing', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  })

  test('Should have a title', () => {
    expect(wrapper.find('#title').text()).toBe('Counter App');
  })

  test('Should have a counter element', () => {
    expect(wrapper.find('#counter').text()).toBe('0');
  })

  test('Should have buttons', () => {
    expect(wrapper.find('#increment').text()).toBe('Increment');
    expect(wrapper.find('#decrement').text()).toBe('Decrement');
  })

  test('Buttons should function', () => {
    wrapper.find('#increment').simulate('click');
    expect(wrapper.find('#counter').text()).toBe('1');
    wrapper.find('#decrement').simulate('click');
    expect(wrapper.find('#counter').text()).toBe('0');
  })
});
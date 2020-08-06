import React from 'react';
import App from '../src/components/App';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

test(`Should contain the title 'Hello, World'`, () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('#title').text()).toBe('Hello, World');
});
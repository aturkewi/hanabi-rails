import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Navbar from '../../Navbar';
jest.mock('aphrodite/lib/inject');

describe('Navbar', () => {
  let wrapper; 
  
  beforeEach(() => {
    wrapper = shallow(<Navbar />);
  })

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  })

  it('wraps content in a div with .navbar class', () => {
    expect(wrapper.find('.navbar').length).toEqual(1);
  })
})
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Signup from '../../Signup';

const middlewares = [ thunk ]; 
const mockStore = configureMockStore(middlewares);
const router = {
  history: {
    replace: jest.fn()
  }
};
const store = mockStore({ form: {} });

describe('Signup', () => {
  let wrapper; 

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Signup />
      </Provider>
    );
  })

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  })

  it('wraps content in a div with .signup class', () => {
    expect(wrapper.find('.signup').length).toEqual(1);
  })

  it('renders a SignupForm', () => {
    expect(wrapper.find('SignupForm').length).toEqual(1);
  })
  
})

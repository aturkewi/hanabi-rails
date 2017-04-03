import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Login from '../../Login';

const middlewares = [ thunk ]; 
const mockStore = configureMockStore(middlewares);
const router = {
  history: {
    replace: jest.fn()
  }
};
const store = mockStore({ form: {} });

describe.skip('Login', () => {
  let wrapper; 

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  })

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  })

  it('wraps content in a div with .login class', () => {
    expect(wrapper.find('.login').length).toEqual(1);
  })

  it('renders a LoginForm', () => {
    expect(wrapper.find('LoginForm').length).toEqual(1);
  })
  
})
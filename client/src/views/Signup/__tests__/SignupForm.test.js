import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SignupForm from '../SignupForm';

const middlewares = [ thunk ]; 
const mockStore = configureMockStore(middlewares);
const router = {
  history: {
    replace: jest.fn()
  }
};
const store = mockStore({ form: {} });
const props = {
  submitting: false,
  onSubmit: jest.fn(),
  handleSubmit: jest.fn()
}

describe('SignupForm', () => {
  let wrapper; 

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <SignupForm {...props} />
      </Provider>
    );
  })

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  })

  it('wraps content in a div with .signup_form class', () => {
    expect(wrapper.find('div.signup_form').length).toEqual(1);
  })

  it('renders 3 Field components for users username, email & password confirmation', () => {
    const fields = wrapper.find('Field')
    expect(fields.length).toEqual(3);
    const params = ['username', 'email', 'password'];
    fields.forEach((f, i) => expect(f.props().name).toEqual(params[i]));
  })
  
})

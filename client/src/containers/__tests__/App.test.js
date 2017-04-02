import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import App from '../App';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
let store = mockStore()
let wrapper; 
let props;

describe.skip('App', () => {
  
  beforeEach(() => {
    props = {
      isAuthenticating: true,
      isAuthenticated: false,
      currentUser: {},
      logout: jest.fn(),
      authenticate: jest.fn(),
      authenticationFailure: jest.fn(),
    }
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  })

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  })

  it('wraps content in a div with .app class', () => {
    expect(wrapper.find('.app').length).toEqual(1);
  })

  it('contains a Router component', () => {
    expect(wrapper.find('Router').length).toEqual(1);
  })

  it('contains a Switch component', () => {
    expect(wrapper.find('Switch').length).toEqual(1);
  })
})
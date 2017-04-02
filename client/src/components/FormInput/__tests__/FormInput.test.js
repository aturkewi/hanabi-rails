import React from 'react';
import { shallow } from 'enzyme';
import FormInput from '../../FormInput';

const props = {
  input: {
    name: 'name'
  },
  label: 'Name:',
  type: '',
  placeholder: '',
  meta: {
    error: null,
    touched: false,
  },
}

describe('Input', () => {
  let wrapper; 

  beforeEach(() => {
    wrapper = shallow(<FormInput {...props} />)
  })

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  })

  it('wraps content in a div with .signup class', () => {
    expect(wrapper.find('div.input').length).toEqual(1);
  })

  it('contains an input tag with props for input, type & placeholder', () => {
    const input = wrapper.find('Input');
    expect(input.length).toEqual(1);
    expect(input.props()).toEqual({
      name: 'name', type: '', placeholder: ''
    })
  })

  it('contains a label tag with label prop value as the innerHTML', () => {
    const label = wrapper.find('label');
    expect(label.length).toEqual(1);
    expect(label.childAt(0).text()).toEqual('Name:');
  })

  describe('if errors and touched', () => {
    let errorProps;
    
    beforeEach(() => {
      errorProps = Object.assign({}, props, {
        meta: {
          error: 'Name is required!',
          touched: true,
        }
      });
      wrapper = shallow(<FormInput {...errorProps} />);
    })

    it('renders a div with .form_error class', () => {
      expect(wrapper.find('div.form_error').length).toEqual(1);
    })

    it('renders the the error message', () => {
      expect(wrapper.find('div.form_error').childAt(0).text()).toEqual('Name is required!');
    })
  })
})
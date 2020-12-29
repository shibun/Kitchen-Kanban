import React from 'react';
//import ReactDom from 'react-dom';
import  LoginPage  from '../LoginPage'
import Enzyme, { shallow,mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import Paragraph from '../_components/Paragraph'



// Configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() })

describe('Paragraph', () => {
  it('should render children inside a p tag', () => {
    const wrapper = shallow(<Paragraph>This is my first test</Paragraph>)
    const paragraph = wrapper.find('p')
    expect(paragraph).toHaveLength(1)
    expect(paragraph.text()).toEqual('This is my first test')
  })
})

describe('Login', () => {

  const initialState = {authentication:{loggingIn: true}};
const mockStore = configureMockStore();

let store, loginwrapper;

beforeEach(()=>{
  store = mockStore(initialState);
  loginwrapper = mount( <Provider store={store}><LoginPage /></Provider> );

})

  it('should have a p tag', () => {
    const paragraph = loginwrapper.find('p')
    expect(paragraph).toHaveLength(1)
    expect(paragraph.text()).toEqual('This is my first test')
  })
})
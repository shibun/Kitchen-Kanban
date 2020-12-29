import React from 'react';
//import ReactDom from 'react-dom';
import  LoginPage  from '../LoginPage'
import Enzyme, { shallow,mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import {Header} from '../_components/Header'



// Configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() })
const history = {
  push: jest.fn(),
};

describe('Login', () => {

  const initialState = {authentication:{loggingIn: true}};
const mockStore = configureMockStore();

let store, loginwrapper,headerwrapper;

beforeEach(()=>{
  store = mockStore(initialState);
  loginwrapper = mount( <Provider store={store}><LoginPage /></Provider> );
  headerwrapper = mount(<Provider store={store}><Header /></Provider>)

})

  it('should have a p tag', () => {
    const paragraph = loginwrapper.find('p')
    expect(paragraph).toHaveLength(1)
    expect(paragraph.text()).toEqual("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,")
  })

  it('login  button is clicked', () => {
    loginwrapper.find('button').simulate('click');

   
    console.log(headerwrapper);
    //expect(headerwrapper.find('#nav').text()).toContain('Home')
    //expect(history.push).toHaveBeenCalledWith('/');
  });
})
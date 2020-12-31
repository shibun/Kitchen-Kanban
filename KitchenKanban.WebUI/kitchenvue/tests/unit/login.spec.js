import { createLocalVue } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Vue from 'vue';
import Login from '@/views/Login.vue'
//import Actions from '../../../src/components/Actions'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Login.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
     
      login: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })

  it('dispatches login when input event value is empty', async() => {
      const mockSubmit= jest.fn();
    const wrapper = shallowMount(Login, { store, localVue })
    const Username = wrapper.find('#Username') 
    Username.element.value == ""
     const Password = wrapper.find('#Password') 
    Password.element.value == ""  
     await Vue.nextTick(()=>{ 
    expect(wrapper.find('h2').text()).toContain('enter username and password')
     });
  })

it('renders props.loginsuccess when passed',async () => {
 const wrapper = shallowMount(Login, {
      propsData: { loginsuccess:true }
    })
   
     const Username = wrapper.find('#Username') 
    Username.element.value != 'admin'
     const Password = wrapper.find('#Password') 
    Password.element.value != '123456'  
     wrapper.setProps({ loginsuccess: false })
 await Vue.nextTick(()=>{
 if (wrapper.props('loginsucess')!=true) {
    expect(wrapper.find('#validation1').exists()).toBe(true)
 }});
   
  })

 it('calls store action "actionClick" when button is clicked', () => {
      const mockSubmit= jest.fn();
    const wrapper = shallowMount(Login, { store, localVue })
     const Username = wrapper.find('#Username') 
    Username.element.value = 'admin' 
     const Password = wrapper.find('#Password') 
    Password.element.value = '123456'   
    wrapper.find("form").trigger("submit.prevent")     
       expect(actions.login).toHaveBeenCalledTimes(1)
 })
})
import { createLocalVue } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
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

  it('dispatches "login" when input event value is ""', () => {
      const mockSubmit= jest.fn();
    const wrapper = shallowMount(Login, { store, localVue })
    const Username = wrapper.find('#Username') 
    Username.element.value == ""
     const Password = wrapper.find('#Password') 
    Password.element.value == ""   
    expect(wrapper.find('h2').text()).toContain('enter username and password')
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
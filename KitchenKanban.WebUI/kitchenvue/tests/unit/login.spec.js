

import { shallowMount } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import Header from '@/layout/Header.vue'

describe('Login.vue', () => {
  it('on login button clicks', () => {
    
    const wrapper = shallowMount(Login)
     const button = wrapper.find('button')  
    wrapper.trigger('click').then(() => {
       const wrapper = shallowMount(Header)
      expect(wrapper.find('#nav').text()).toContain('Home')
      done()
    
  })
  
  })
})


import { shallowMount } from '@vue/test-utils'
import Login from '@/views/Login.vue'

describe('Login.vue', () => {
  it('on login button clicks', () => {
    
    const wrapper = shallowMount(Login)
     const button = wrapper.find('button')  
const text = wrapper.find('h1')
 wrapper.trigger('click').then(() => {
    expect(wrapper.text()).toContain('Sign in')
    wrapper.trigger('click').then(() => {
      expect(wrapper.text()).toContain('some different text')
      done()
    })
  })
  
  })
})
import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import testService from '@/services/testService'


describe('Home.vue', () => {
  it('renders kicthen api called',async () => {

  
    const wrapper = shallowMount(Home, {     
    })
wrapper.vm.getProducts = jest.fn();
 expect(wrapper.vm.getProducts.mock.calls.length).toBe(0)
   
  
  })
})

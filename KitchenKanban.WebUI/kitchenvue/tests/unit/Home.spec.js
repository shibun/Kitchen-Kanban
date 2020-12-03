import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
jest.mock('axios', () => ({
  get: Promise.resolve('value')
}))

describe('Home.vue', () => {
  it('renders kicthen api called', () => {

  const getProducts = jest.fn()
    const wrapper = shallowMount(Home, {
     
    })
    expect(wrapper.text()).toBe('value')
  expect(getProducts).toBeCalled(1)
  })
})

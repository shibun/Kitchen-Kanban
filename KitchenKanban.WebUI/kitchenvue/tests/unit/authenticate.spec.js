import { shallowMount } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import Header from '@/layout/Header.vue'
import Vuex from 'vuex'
import store from '@/store/store'


describe("Login.vue", () => {
     let actions
  let store

  beforeEach(() => {
       store = new Vuex.Store({
      actions
    })
    actions = {
     
      login: jest.fn()
    }
   
  })
  it("authenticated a user", async () => {
    const commit = jest.fn()
    const Username = "admin"
    const password = "123456"
    const url=""
    const body=""

    await actions.login({ commit }, { Username, password })

   expect(url).toBe("http://localhost:64464/WebApi/token")
    expect(body).toEqual({ Username, password })
    expect(commit).toHaveBeenCalledWith(
      "auth_success", true)
  })

  it("catches an error", async () => {
  const mockError = true

  await expect(actions.login({ commit: jest.fn() }, {}))
    .rejects.toThrow("API Error occurred.")
})
})
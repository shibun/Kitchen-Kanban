import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import apiConfig from '../config/apiConfig'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : null,
    testdata:{
        name:'xx'
    }
  },
  mutations: {
    auth_request(state){
        state.status = 'loading'
      },
      auth_success(state, user){
        state.status = 'success'
        state.token = user.token
        state.user = user
        localStorage.setItem('user', JSON.stringify(user))
      },
      auth_error(state){
        state.status = 'error'
      },
      logout(state){
        state.status = ''
        state.token = ''
        
      },
  },
  actions: {
    login({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: 'http://localhost:64464/WebApi/token', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
              
            localStorage.setItem('token', token)
           
            //apiConfig.defaults.headers.common['Authorization'] = token
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success',resp.data)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        })
    },
    logout({commit}){
        return new Promise((resolve, reject) => {
          //this.$router.push('/login')
          commit('logout')
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
         
          resolve()
          reject()
        })
      }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    loggedUser: state => state.user,
    testData: state => state.testdata,
  }
})
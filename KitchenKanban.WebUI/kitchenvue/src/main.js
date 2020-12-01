import Vue from 'vue'
import App from './App.vue'

import './assets/styles/kitchenstyles.css';
import router from './router/router'
import store from './store/store'

import axios from 'axios'

Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://localhost:64464/WebApi/api/';
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
 
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'

import './assets/styles/kitchenstyles.css';
import './assets/styles/bootstrap.css';

import 'jquery/src/jquery.js'
//import './assets/js/jquery.min.js'
//window.$ = window.jQuery = require('jquery');
const { $, jQuery } = require('jquery');
global.$ = $;
global.jQuery = jQuery;
import './assets/js/bootstrap.min.js'


//import 'bootstrap/dist/css/bootstrap.css'
//import 'jquery/src/jquery.js'
//import 'bootstrap/dist/js/bootstrap.min.js'

import router from './router/router'
import store from './store/store'

import axios from 'axios'


Vue.prototype.$http = axios;

axios.defaults.baseURL = 'http://localhost:64464/WebApi/api/';
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
  Vue.prototype.$http.defaults.headers.common['Content-Type'] = 'application/json;'
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

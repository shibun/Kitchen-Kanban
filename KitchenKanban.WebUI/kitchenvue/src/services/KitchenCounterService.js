
import axios from 'axios'

export default {
    name: 'KitchenCounterService',
  get() {
    //return Vue.http.get('/api/posts');
    return axios.get('/Kitchen');
  },
  post(kcounternumber){
      const article = { CounterNumber:kcounternumber };
    return axios.post('/Kitchen',article)
  }
}

import axios from 'axios'

export default {
    name: 'KitchenCounterService',
  get() {
    //return Vue.http.get('/api/posts');
    return axios.get('/Kitchen');
  },
  post(CounterNumber){
      const article = { CounterNumber:CounterNumber };
    return axios.post('/Kitchen',article)
  },
  
    patch(kcounternumber){
    
    const article = { CounterNumber:kcounternumber };
    return axios.post('/Kitchen',article)
  },
  delete(counterid){
    
    return null
  },

}
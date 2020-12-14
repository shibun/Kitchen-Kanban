
import axios from 'axios'

export default {
    name: 'KitchenCounterService',
  get() {
    //return Vue.http.get('/api/posts');
    return axios.get('/Kitchen');
  },
  post(Kitchen){
      
    return axios.post('/Kitchen',Kitchen)
  },
  
    patch(Kitchen){
    
    
    return axios.put('/Kitchen',Kitchen)
  },
  deletecounter(KitchenId){    
     return axios.delete('/Kitchen/'+ KitchenId)
  },

}

import axios from 'axios'

export default {
    name: 'ItemListService',
  get() {
    //return Vue.http.get('/api/posts');
    return axios.get('/Item');
  },
  post(itemname,itemcharge){
    const article = { ItemName:itemname,ItemCharge:itemcharge };
    return axios.post('/Item',article)
  }
}

import axios from 'axios'

export default {
    name: 'ItemListService',
  get() {
    //return Vue.http.get('/api/posts');
    return axios.get('/Item');
  },
  post(Item){
    
    const article = { ItemName:Item.ItemName,ItemCharge:parseFloat(Item.ItemCharge) };
    return axios.post('/Item',article)
  },
    patch(Item){
    
    const article = { ItemName:Item.ItemName,ItemCharge:parseFloat(Item.ItemCharge) };
    return axios.post('/Item',article)
  },
   delete(itemid){
    
    
    return null
  }
}
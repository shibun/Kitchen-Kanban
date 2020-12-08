
import axios from 'axios'

export default {
    name: 'OrderService',
  
  post(Orderdetail){
    
       return axios.post('/Order',Orderdetail)
  }
   
}
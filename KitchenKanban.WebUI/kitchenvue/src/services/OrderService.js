
import axios from 'axios'

export default {
    name: 'OrderService',
  
  post(Orderdetail){
    
       return axios.post('/Order',Orderdetail)
  },
  get(){
    return axios.get('/Order/OrderReport')
  },
  getOrderById(orderId){
    return axios.get('/Order/GetOrderById?orderId=' + orderId)
  }
   
}
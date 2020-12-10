
import axios from 'axios'

export default {
    name: 'OrderService',
  
  addOrder(Orderdetail){
       return axios.post('/Order',Orderdetail)
  },
  updateOrder(Orderdetail){
    return axios.put('/Order',Orderdetail)
},
  get(){
    return axios.get('/Order/OrderReport')
  },
  getOrderById(orderId){
    return axios.get('/Order/GetOrderById?orderId=' + orderId)
  },
  getOrderDetails(id) {
    return axios.get('/Order/GetOrderById',{ 
        params: { orderId: id}});
},
   
}
import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';

export const orderService = {   
  addNewOrder,
  getAllOrders,
  getOrderById,
  updateNewOrder
};



 function addNewOrder(data) {
    
    axios.defaults.headers.common =  authHeader()
    return axios.post(`${config.apiUrl}/Order`,data);
  }
  function getAllOrders() {   
       axios.defaults.headers.common =  authHeader()
    return axios.get(`${config.apiUrl}/Order/OrderReport`);  
    
}
 function getOrderById(orderId) {
    
    axios.defaults.headers.common =  authHeader()
    return axios.get(`${config.apiUrl}/Order/GetOrderById?orderId=` + orderId);
  }

   function updateNewOrder(data) {
    
    axios.defaults.headers.common =  authHeader()
    return axios.put(`${config.apiUrl}/Order`,data);
  }
    
 
  
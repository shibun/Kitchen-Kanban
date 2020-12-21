import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';

export const dashboardService = {   
    getKanboard,
    getOrderDetails,
    updateOrderStatus
};



 function getKanboard(data) {
    
    axios.defaults.headers.common =  authHeader()
    return axios.get(`${config.apiUrl}/Dashboard/Kanbanboard`,data);
  }
  function getOrderDetails(id) {   
       axios.defaults.headers.common =  authHeader()
    return axios.get(`${config.apiUrl}/Order/GetOrderById`,{ 
        params: { orderId: id}}); 
  }
  function updateOrderStatus(data) {
    return axios.post(`${config.apiUrl}/Order/OrderStatus`,data);
}
 
  
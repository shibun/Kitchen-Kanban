import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';

export const orderService = {   
  addNewOrder
};



 function addNewOrder(data) {
    
    axios.defaults.headers.common =  authHeader()
    return axios.post(`${config.apiUrl}/Order`,data);
  }
  
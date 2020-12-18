import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';

export const itemsListService = {   
    getAll,
    addItem, 
    deleteItem ,
    updateItem  
};


function getAll() {   
       axios.defaults.headers.common =  authHeader()
    return axios.get(`${config.apiUrl}/Item`);  
    
}
 function addItem(data) {
    
    axios.defaults.headers.common =  authHeader()
    return axios.post(`${config.apiUrl}/Item`,data);
  }
  function updateItem(data) {
    
    axios.defaults.headers.common =  authHeader()
    return axios.put(`${config.apiUrl}/Item`,data);
  }
  function deleteItem(itemId) {
  
    axios.defaults.headers.common =  authHeader()
    return axios.delete(`${config.apiUrl}/Item/`+itemId);
  }
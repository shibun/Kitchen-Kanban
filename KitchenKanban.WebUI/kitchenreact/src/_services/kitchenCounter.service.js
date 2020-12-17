import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';

export const kitchenCounterService = {   
    getAll ,
    addCounter, 
    deleteCounter ,
    updateCounter     
};


function getAll() {   
       axios.defaults.headers.common =  authHeader()  
        return axios.get(`${config.apiUrl}/Kitchen`);      
}
 function addCounter(data) {
    
    axios.defaults.headers.common =  authHeader()
    return axios.post(`${config.apiUrl}/Kitchen`,data);
  }
  function updateCounter(data) {
    
    axios.defaults.headers.common =  authHeader()
    return axios.put(`${config.apiUrl}/Kitchen`,data);
  }
  function deleteCounter(counterId) {
  
    axios.defaults.headers.common =  authHeader()
    return axios.delete(`${config.apiUrl}/Kitchen/`+counterId);
  }
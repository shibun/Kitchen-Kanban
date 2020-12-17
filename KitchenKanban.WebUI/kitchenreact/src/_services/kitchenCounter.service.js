import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';

export const kitchenCounterService = {   
    getAll    
};


function getAll() {   
       axios.defaults.headers.common =  authHeader()  
        return axios.get(`${config.apiUrl}/Kitchen`);      
}
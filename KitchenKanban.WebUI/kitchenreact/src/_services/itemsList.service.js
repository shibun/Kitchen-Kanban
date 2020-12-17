import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';

export const itemsListService = {   
    getAll    
};


function getAll() {     
     return axios.get('http://localhost:64464/WebApi/api/Item');
}
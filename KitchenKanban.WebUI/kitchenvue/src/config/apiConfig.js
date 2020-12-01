import axios from 'axios'
export default axios.create({
  baseURL: 'http://localhost:64464/WebApi/api',
  timeout: 5000,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        //'X-Auth-Token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
})
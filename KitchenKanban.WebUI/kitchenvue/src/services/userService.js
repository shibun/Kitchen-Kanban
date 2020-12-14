
import axios from 'axios'

export default {
  getUsers() {
    return axios.get('/User');
  },
  getUser(userid) {
    return axios.get('/User/GetUserById',{ 
      params: { userId: userid}});
  },
  addUser(data) {
    return axios.post('/User',data);
  },
  updateUser(data) {
    return axios.put('/User',data);
  }
}
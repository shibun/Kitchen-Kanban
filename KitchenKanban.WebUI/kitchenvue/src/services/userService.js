
import axios from 'axios'

export default {
  getUsers() {
    return axios.get('/User');
  },
  addUser(data) {
    return axios.post('/User',data);
  }
}
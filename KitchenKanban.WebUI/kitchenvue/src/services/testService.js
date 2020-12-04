
import axios from 'axios'

export default {
    name: 'testService',
  get() {
    //return Vue.http.get('/api/posts');
    return axios.get('/Kitchen');
  }
}
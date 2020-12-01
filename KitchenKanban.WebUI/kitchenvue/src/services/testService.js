
import axios from 'axios'

export default {
  get() {
    //return Vue.http.get('/api/posts');
    return axios.get('/Kitchen');
  }
}
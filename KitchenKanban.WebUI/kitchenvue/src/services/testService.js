
import apiconfig from '../config/apiConfig'

export default {
  get() {
    //return Vue.http.get('/api/posts');
    return apiconfig.get('/Kitchen');
  }
}
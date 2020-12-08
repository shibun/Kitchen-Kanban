
import axios from 'axios'

export default {
    getKanboard() {
        return axios.get('/Dashboard/Kanbanboard');
    },
    getOrderDetails(id) {
        return axios.get('/Order/GetOrderById',{ 
            params: { orderId: id}});
    },
  }

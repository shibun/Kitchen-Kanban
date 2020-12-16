import axios from 'axios';
//axios.defaults.baseURL = 'http://localhost:1010/'
const user = localStorage.getItem('user')
        if (user) {
            console.log('axio user',user);
            axios.defaults.headers.common['Authorization'] = user.token
        }
export default axios;
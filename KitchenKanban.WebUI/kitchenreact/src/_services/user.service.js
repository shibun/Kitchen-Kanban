import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios'
export const userService = {
    login,
    logout,
    getAll,
    add,
    update
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.baseUrl}/token`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = user.token
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    axios.defaults.headers.common =  authHeader()
    return axios.get(`${config.apiUrl}/User`);
  }

  function add(data) {
    axios.defaults.headers.common =  authHeader()
    return axios.post(`${config.apiUrl}/User`,data);
  }
  function update(data) {
    axios.defaults.headers.common =  authHeader()
    return axios.put(`${config.apiUrl}/User`,data);
  }
function getAllo() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/user`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    console.log(response)
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
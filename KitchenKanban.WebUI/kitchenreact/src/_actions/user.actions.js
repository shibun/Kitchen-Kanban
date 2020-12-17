import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    getUsers,
    addUser
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getUsers() {
    return (dispatch) => {
      userService
        .getUsers()
        .then((res) => {
          dispatch({
            type: userConstants.GETALL_SUCCESS,
            payload: res.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: userConstants.GETALL_FAILURE,
            payload: error,
          });
        });
    };
  }

  function addUser(data) {
    return (dispatch) => {
      userService
        .addUser(data)
        .then((res) => {
          dispatch({
            type: userConstants.CREATEUSER_SUCCESS,
            payload: res.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: userConstants.CREATEUSER_FAILURE,
            payload: error,
          });
        });
    };
  }

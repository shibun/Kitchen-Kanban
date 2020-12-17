import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    getAll,
    add
};

function login(username, password) {

  return (dispatch) => {
    dispatch(
      {
        type: userConstants.LOGIN_REQUEST,
        user: username,
      });
     userService
      .login(username, password)
      .then((res) => {
        dispatch({
          type: userConstants.LOGIN_SUCCESS,
          user: res.data,
        });
        history.push('/');
      })
      .catch((error) => {
        dispatch({
          type: userConstants.LOGIN_FAILURE,
          error: error,
        });
      });
  };
}
function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getAll() {
    return (dispatch) => {
      userService
        .getAll()
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

  function add(data) {
    return (dispatch) => {
      userService
        .add(data)
        .then((res) => {
          dispatch({
            type: userConstants.CREATE_REQUEST,
            payload: res.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: userConstants.CREATE_FAILURE,
            payload: error,
          });
        });
    };
  }

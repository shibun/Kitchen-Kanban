import { orderConstants } from '../_constants';
import { orderService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const orderActions = {
   addNewOrder,
   getAllOrders,
   getOrderById,
   updateNewOrder
};

  function addNewOrder(data) {
    return (dispatch) => {
      return orderService
        .addNewOrder(data)
        .then((res) => {
          dispatch({
            type: orderConstants.CREATENEWORDER_SUCCESS,
            payload: res.data,
          });
         //dispatch(alertActions.success(res))
        })
        .catch((error) => {
          dispatch({
            type: orderConstants.CREATENEWORDER_FAILURE,
            payload: error,
          });
           dispatch(alertActions.error(error.response))
        });
    };
  }
  function getAllOrders() {
    return (dispatch) => {
      orderService
        .getAllOrders()
        .then((res) => {
          dispatch({
            type: orderConstants.GETALL_SUCCESS,
            payload: res.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: orderConstants.GETALL_FAILURE,
            payload: error,
          });
        });
    };
  }
    function getOrderById(orderId) {
    return (dispatch) => {
      return orderService
        .getOrderById(orderId)
        .then((res) => {
          dispatch({
            type: orderConstants.GETORDERBYID_SUCCESS,
            payload: res.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: orderConstants.GETORDERBYID_FAILURE,
            payload: error,
          });
        });
    };
  }
   function updateNewOrder(data) {
    return (dispatch) => {
      return orderService
        .updateNewOrder(data)
        .then((res) => {
          dispatch({
            type: orderConstants.UPDATE_NEWORDER_SUCCESS,
            payload: res.data,
          });
           // dispatch(alertActions.success(res))
        })
        .catch((error) => {
          dispatch({
            type: orderConstants.UPDATE_NEWORDER_FAILURE,
            payload: error,
          });
           dispatch(alertActions.error(error.response))
        });
    };
  }



  
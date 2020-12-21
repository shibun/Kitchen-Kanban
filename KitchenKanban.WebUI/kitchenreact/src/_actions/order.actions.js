import { orderConstants } from '../_constants';
import { orderService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const orderActions = {
   addNewOrder,
   getAllOrders,
   getOrderById
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
        })
        .catch((error) => {
          dispatch({
            type: orderConstants.CREATENEWORDER_FAILURE,
            payload: error,
          });
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



  
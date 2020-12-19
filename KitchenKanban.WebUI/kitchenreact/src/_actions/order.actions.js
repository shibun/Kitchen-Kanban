import { orderConstants } from '../_constants';
import { orderService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const orderActions = {
   addNewOrder
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
  
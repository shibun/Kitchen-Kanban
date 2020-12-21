import { orderConstants } from '../_constants';
import { dashboardService } from '../_services';

export const dashboardActions = {
  getKanboard,
  getOrderDetails,
};


function getKanboard() {
    return (dispatch) => {
      return dashboardService
        .getKanboard()
        .then((res) => {
          dispatch({
            type: orderConstants.GET_KANBOARD_SUCCESS,
            payload: res.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: orderConstants.GET_KANBOARD_FAILURE,
            payload: error,
          });
        });
    };
  }

  function getOrderDetails(id) {
    return (dispatch) => {
      return dashboardService
        .getOrderDetails(id)
        .then((res) => {
          dispatch({
            type: orderConstants.GETORDER_DETAILS_SUCCESS,
            payload: res.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: orderConstants.GETORDER_DETAILS_FAILURE,
            payload: error,
          });
        });
    };
  }

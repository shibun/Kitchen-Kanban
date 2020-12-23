import { kitchenCounterConstants } from '../_constants';
import { kitchenCounterService } from '../_services';
import { alertActions } from './';
//import { history } from '../_helpers';

export const kitchenCounterActions = {   
    getAll,
     addCounter,    
    deleteCounter,
    updateCounter,   
};
function getAll() {

    return (dispatch) => {
        kitchenCounterService
          .getAll()
          .then((res) => {
            dispatch({
              type: kitchenCounterConstants.GETALL_SUCCESS,
              payload: res.data,
            });
            
          })
          .catch((error) => {
            dispatch({
              type:kitchenCounterConstants.GETALL_FAILURE,
              payload: error,
            });
          });
        }
}
 function addCounter(data) {

    return (dispatch) => {
      return  kitchenCounterService
          .addCounter(data)
          .then((res) => {
            dispatch({
              type: kitchenCounterConstants.CREATE_SUCCESS,
              payload: res.data,
            });
             dispatch(alertActions.success(res))
          })
          .catch((error) => {
            dispatch({
              type:kitchenCounterConstants.CREATE_FAILURE,
              payload: error,
            });
            dispatch(alertActions.error(error.response))
          });
        }
      };


 function updateCounter(data) {

    return (dispatch) => {
      return  kitchenCounterService
          .updateCounter(data)
          .then((res) => {
            dispatch({
              type: kitchenCounterConstants.UPDATE_SUCCESS,
              payload: res.data,
            });
             dispatch(alertActions.success(res))
          })
          .catch((error) => {
            dispatch({
              type:kitchenCounterConstants.UPDATE_FAILURE,
              payload: error,
            });
            dispatch(alertActions.error(error.response))
          });
        }
      };
function deleteCounter(data) {

    return (dispatch) => {
      return  kitchenCounterService
          .deleteCounter(data)
          .then((res) => {
            dispatch({
              type: kitchenCounterConstants.DELETE_SUCCESS,
              payload: res.data,
            });
             dispatch(alertActions.success(res))
          })
          .catch((error) => {
            dispatch({
              type:kitchenCounterConstants.DELETE_FAILURE,
              payload: error,
            });
            dispatch(alertActions.error(error.response))
          });
        }
      };
      





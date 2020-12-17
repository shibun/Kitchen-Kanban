import { kitchenCounterConstants } from '../_constants';
import { kitchenCounterService } from '../_services';
//import { alertActions } from './';
//import { history } from '../_helpers';

export const kitchenCounterActions = {   
    getAll,   
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

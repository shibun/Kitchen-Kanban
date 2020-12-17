import { itemsListConstants } from '../_constants';
import { itemsListService } from '../_services';
//import { alertActions } from './';
//import { history } from '../_helpers';

export const itemsListActions = {   
    getAll,   
};
function getAll() {

    return (dispatch) => {
        itemsListService
          .getAll()
          .then((res) => {
            dispatch({
              type: itemsListConstants.GETALL_SUCCESS,
              payload: res.data,
            });
          })
          .catch((error) => {
            dispatch({
              type:itemsListConstants.GETALL_FAILURE,
              payload: error,
            });
          });
        }
      };

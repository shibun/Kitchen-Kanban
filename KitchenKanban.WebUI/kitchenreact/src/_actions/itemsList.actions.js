import { itemsListConstants } from '../_constants';
import { itemsListService } from '../_services';
//import { alertActions } from './';
//import { history } from '../_helpers';

export const itemsListActions = {   
    getAll,   
};
function getAll() {
    return dispatch => {
        dispatch(request());

        itemsListService.getAll(true)
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: itemsListConstants.ITEMS_GETALL_REQUEST } }
    function success(items) { return { type: itemsListConstants.ITEMS_GETALL_SUCCESS, items } }
    function failure(error) { return { type: itemsListConstants.ITEMS_GETALL_FAILURE, error } }
}

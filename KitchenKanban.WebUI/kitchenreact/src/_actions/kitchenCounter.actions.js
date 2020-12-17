import { kitchenCounterConstants } from '../_constants';
import { kitchenCounterService } from '../_services';
//import { alertActions } from './';
//import { history } from '../_helpers';

export const kitchenCounterActions = {   
    getAll,   
};
function getAll() {
    return dispatch => {
        dispatch(request());

        kitchenCounterService.getAll(true)
            .then(
                kitchenCounters => dispatch(success(kitchenCounters)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: kitchenCounterConstants.KITCHENCOUNTER_GETALL_REQUEST } }
    function success(kitchenCounters) { return { type: kitchenCounterConstants.KITCHENCOUNTER_GETALL_SUCCESS, kitchenCounters } }
    function failure(error) { return { type: kitchenCounterConstants.KITCHENCOUNTER_GETALL_FAILURE, error } }
}

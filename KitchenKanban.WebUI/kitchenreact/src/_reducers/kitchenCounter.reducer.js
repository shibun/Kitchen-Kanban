import { kitchenCounterConstants } from '../_constants';

export function kitchenCounters(state = {}, action) {
    switch (action.type) {      
       
        case kitchenCounterConstants.KITCHENCOUNTER_GETALL_REQUEST:
            return {
                loading: true
            };
        case kitchenCounterConstants.KITCHENCOUNTER_GETALL_SUCCESS:
            return {
                items: action.kitchenCounters
            };
        case kitchenCounterConstants.KITCHENCOUNTER_GETALL_FAILURE:
            return {
                error: action.error
            };
      
        default:
            return state
    }
}
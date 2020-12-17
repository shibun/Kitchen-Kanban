import { kitchenCounterConstants } from '../_constants';

export function kitchenCounters(state = {}, action) {
    switch (action.type) {      
       
        case kitchenCounterConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case kitchenCounterConstants.GETALL_SUCCESS:
            return {
                items: action.payload
            };
        case kitchenCounterConstants.GETALL_FAILURE:
            return {
                error: action.payload
            };
      
        default:
            return state
    }
}
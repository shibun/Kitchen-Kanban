import { itemsListConstants } from '../_constants';

export function itemsList(state = {}, action) {
    switch (action.type) {      
       
        case itemsListConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case itemsListConstants.GETALL_SUCCESS:
            return {
                items: action.payload
            };
        case itemsListConstants.GETALL_FAILURE:
            return {
                error: action.payload
            };
      
        default:
            return state
    }
}
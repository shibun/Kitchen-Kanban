import { itemsListConstants } from '../_constants';

export function itemsList(state = {}, action) {
    switch (action.type) {      
       
        case itemsListConstants.ITEMS_GETALL_REQUEST:
            return {
                loading: true
            };
        case itemsListConstants.ITEMS_GETALL_SUCCESS:
            return {
                items: action.items
            };
        case itemsListConstants.ITEMS_GETALL_FAILURE:
            return {
                error: action.error
            };
      
        default:
            return state
    }
}
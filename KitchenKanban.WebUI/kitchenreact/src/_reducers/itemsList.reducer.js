import { itemsListConstants } from '../_constants';

export function items(state = {}, action) {
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
           
        case itemsListConstants.UPDATE_SUCCESS:
            return {  updateditem: action.payload };
        case itemsListConstants.UPDATE_FAILURE:
            return {  error: action.payload};
      
        default:
            return state
    }
}
export function createditem(state = {}, action) {
    switch (action.type) {      
       
    case itemsListConstants.CREATE_REQUEST:
        return {
            loading: true
        };
    case itemsListConstants.CREATE_SUCCESS:
      return action.payload
      ;
    case itemsListConstants.CREATE_FAILURE:
        return {
            error: action.error
        };
      
        default:
            return state
    }
}

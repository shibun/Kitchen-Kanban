import { orderConstants } from '../_constants';

export function orders(state = {}, action) {
  switch (action.type) {
    case orderConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case orderConstants.GETALL_SUCCESS:
      return {
        items: action.payload
      };
    case orderConstants.GETALL_FAILURE:
      return { 
        error: action.payload
      };

  
    default:
      return state
  }
}
export function getorder(state = {}, action) {
  switch (action.type) {
  
    case orderConstants.GETORDERBYID_SUCCESS:
      return {
        item: action.payload
      };
    case orderConstants.GETORDERBYID_FAILURE:
      return { 
        error: action.payload
      };

  
    default:
      return state
  }
}


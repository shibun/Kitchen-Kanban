import { orderConstants } from '../_constants';

export function kanbanorders(state = {}, action) {
  switch (action.type) {
    case orderConstants.GET_KANBOARD_REQUEST:
      return {
        loading: true
      };
    case orderConstants.GET_KANBOARD_SUCCESS:
      return {
        items: action.payload
      };
    case orderConstants.GET_KANBOARD_FAILURE:
      return { 
        error: action.payload
      };

  
    default:
      return state
  }
}

export function orderdetails(state = {}, action) {
    switch (action.type) {
    
      case orderConstants.GETORDER_DETAILS_SUCCESS:
        return {
          item: action.payload
        };
      case orderConstants.GETORDER_DETAILS_FAILURE:
        return { 
          error: action.payload
        };
  
    
      default:
        return state
    }
  }
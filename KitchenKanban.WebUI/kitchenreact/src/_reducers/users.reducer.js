import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.payload
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.payload
      };

    case userConstants.CREATE_REQUEST:
        return {
            loading: true
        };
    case userConstants.CREATE_SUCCESS:
      return {
        item: action.payload
      };
    case userConstants.CREATE_FAILURE:
        return {
            error: action.error
        };

    case userConstants.UPDATE_REQUEST:
      return {
          loading: true
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        item: action.payload
      };
    case userConstants.UPDATE_FAILURE:
        return {
            error: action.error
        };

    default:
      return state
  }
}

export function createduser(state = {}, action) {
  switch (action.type) {
    
    case userConstants.CREATE_REQUEST:
        return {
            loading: true
        };
    case userConstants.CREATE_SUCCESS:
      return action.payload
     
    case userConstants.CREATE_FAILURE:
        return {
            error: action.error
        };

    case userConstants.UPDATE_REQUEST:
      return {
          loading: true
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        item: action.payload
      };
    case userConstants.UPDATE_FAILURE:
        return {
            error: action.error
        };

    default:
      return state
  }
}

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

      case userConstants.CREATEUSER_REQUEST:
        return {
            loading: true
        };
    case userConstants.CREATEUSER_SUCCESS:
      return {
        item: action.payload
      };
    case userConstants.CREATEUSER_FAILURE:
        return {
            error: action.error
        };

    default:
      return state
  }
}

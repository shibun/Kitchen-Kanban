import { itemsListConstants } from '../_constants';
import { itemsListService } from '../_services';
import { mediaService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const itemsListActions = {   
    getAll,
    addItem,    
    deleteItem,
    updateItem,
    updateImage,
    uploadImage
};
function getAll() {

    return (dispatch) => {
        itemsListService
          .getAll()
          .then((res) => {
            dispatch({
              type: itemsListConstants.GETALL_SUCCESS,
              payload: res.data,
            });
          })
          .catch((error) => {
            dispatch({
              type:itemsListConstants.GETALL_FAILURE,
              payload: error,
            });
          });
        }
      };

function uploadImage(file, ReferenceId, ImageType) {
      return (dispatch) => {
        return mediaService
          .uploadImage(file, ReferenceId, ImageType)
          .then((res) => {
            dispatch({
              type: itemsListConstants.IMAGE_CREATE_SUCCESS,
              payload: res.data,
            });
            dispatch(alertActions.success(res))
          })
          .catch((error) => {
            dispatch({
              type:itemsListConstants.IMAGE_CREATE_FAILURE,
              payload: error,
            });
            dispatch(alertActions.error(error.response))
          });
        }
}

function updateImage(file, ReferenceId) {
      return (dispatch) => {
       return mediaService
          .updateImage(file, ReferenceId)
          .then((res) => {
            dispatch({
              type: itemsListConstants.IMAGE_UPDATE_SUCCESS,
              payload: res.data,
            });
            dispatch(alertActions.success(res))
          })
          .catch((error) => {
            dispatch({
              type:itemsListConstants.IMAGE_UPDATE_FAILURE,
              payload: error,
            });
            dispatch(alertActions.error(error.response))
          });
        }

 
}
  function addItem(data) {

    return (dispatch) => {
      return  itemsListService
          .addItem(data)
          .then((res) => {
            dispatch({
              type: itemsListConstants.CREATE_SUCCESS,
              payload: res.data,
            });
             dispatch(alertActions.success(res))
          })
          .catch((error) => {
            dispatch({
              type:itemsListConstants.CREATE_FAILURE,
              payload: error,
            });
              dispatch(alertActions.error(error.response))
          });
        }
      };


 function updateItem(data) {

    return (dispatch) => {
       return itemsListService
          .updateItem(data)
          .then((res) => {
            dispatch({
              type: itemsListConstants.UPDATE_SUCCESS,
              payload: res.data,
            });
             dispatch(alertActions.success(res))
            
          })
          .catch((error) => {
            dispatch({
              type:itemsListConstants.UPDATE_FAILURE,
              payload: error,
            });
            dispatch(alertActions.error(error.response))
          });
        }
      };




function deleteItem(data) {

    return (dispatch) => {
       return itemsListService
          .deleteItem(data)
          .then((res) => {
            dispatch({
              type: itemsListConstants.DELETE_SUCCESS,
              payload: res.data,
            });
            dispatch(alertActions.success(res))
          })
          .catch((error) => {
            dispatch({
              type:itemsListConstants.DELETE_FAILURE,
              payload: error,              
            });
             dispatch(alertActions.error(error.response))
          });
        }
      };
      

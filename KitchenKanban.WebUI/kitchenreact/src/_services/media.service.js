import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';

export const mediaService = {   
  uploadImage,
  updateImage
};


 function uploadImage(files, referenceId, fileType) {
     console.log('file is',files);
     
    axios.defaults.headers.common =  authHeader()
    return axios.post(`${config.apiUrl}/Image?referenceId=` + referenceId + `&fileType=` + fileType,
        files,);
  }
  function updateImage(files, referenceId) {
     console.log('file is update',files);
     
    axios.defaults.headers.common =  authHeader()
    return axios.put(`${config.apiUrl}/Image?imageId=` + referenceId,
        files,);
  }
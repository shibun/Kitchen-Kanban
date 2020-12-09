
import axios from 'axios'

export default {
    name: 'MediaService';
  getImage(imageId) {
    //return Vue.http.get('/api/posts');
     const article = { imageId:imageId };
    return axios.get('/Image',article).then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
      }); 
  },
 
  uploadfile(files, referenceId, fileType)
  {
    return axios.post(
        '/Image?referenceId=' + referenceId + '&fileType=' + fileType,
        files,
        )  
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
      }); 
  }
}
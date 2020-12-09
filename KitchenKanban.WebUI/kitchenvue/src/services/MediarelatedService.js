
import axios from 'axios'

export default {
    name: 'MediarelatedService',
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
  },
  getImage(imageId) {
    //return Vue.http.get('/api/posts');
    console.log(imageId);
     const article = { imageId:imageId};
    return axios.get('/Image?imageId=' + imageId).then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
      }); 
  }
 

}
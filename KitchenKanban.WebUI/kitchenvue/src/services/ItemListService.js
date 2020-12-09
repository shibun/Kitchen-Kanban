
import axios from 'axios'

export default {
    name: 'ItemListService',
  get() {
    //return Vue.http.get('/api/posts');
    return axios.get('/Item');
  },
  post(Item){
    
    const article = { ItemName:Item.ItemName,ItemCharge:parseFloat(Item.ItemCharge) };
    return axios.post('/Item',article)
  },
    patch(Item){
    
    const article = { ItemId:Item.ItemId,ItemName:Item.ItemName,ItemCharge:parseFloat(Item.ItemCharge) };
    return axios.put('/Item',article)
  },
   deleteitem(ItemId){
    
    
    return axios.delete('/Item',ItemId)
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
  },
}
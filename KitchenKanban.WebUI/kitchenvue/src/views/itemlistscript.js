import ItemListService from "../services/ItemListService";
import MessageSuccess from "@/components/MessageSuccess.vue";
import MessageError from "@/components/MessageError.vue";
import MediarelatedService from "../services/MediarelatedService";
export default {
  name: "ItemList",
  created() {
    this.getItems();
  },
  components: {
    MessageSuccess,
    MessageError,
  },

  data() {
    return {
      Item: {
        ItemName: "",
        ItemCharge: 0,
        ImageId:""
      },
      files: "",
      Items: [],
      itemsnotfound: false,
      successmsg: "",
      errormsg: "",
      editmode: false,
      isShowForm: false,
      imagedata:'',
    };
  },
  filters: {
    toUSD(price) {
      return `$${price}`;
    },
    toFixed(value) {
      return value.toFixed(2);
    },
  },

  methods: {
    showForm() {
      this.isShowForm = true;
    },
    hideForm() {
      this.isShowForm = false;
      this.clearItem();
    },
    getItems() {
      (this.successmsg = false),
        ItemListService.get().then((response) => {
          if (response.data.length > 0) {
            console.log("Image : ", response.data);
            (this.Items = response.data);
             (this.itemsnotfound = false);
          } else {
            this.itemsnotfound = true;
          }
        });
    },
    addItem: function() {
      console.log('item is in add', this.files);
      if (!this.Item.ItemName) {
        this.errormsg = "Please enter Item Name";
        return;
      }
      if (!this.Item.ItemCharge) {
        this.errormsg = "Please enter Item Charge";
        return;
      }
      ItemListService.post(this.Item)
        .then((response) => {           
            if(this.files != '')
            {
              const files = this.files;
              MediarelatedService.uploadfile(files, response.data.itemId, 2)
                .then((response) => {            
                  console.log("response", response);
                })
              .catch((err) => {
                (this.errormsg = "error occured"), console.log(err.message);
              });
            }
            this.successmsg = "Item added";
             this.clearItem();

            
        })
        .catch((err) => {
          (this.errormsg = "error occured"), console.log(err.message);
        });
    },
    edititem: function(data) {
        this.showForm(),
      (this.editmode = true),
        console.log("datais", data),
        (this.Item.ItemName = data.itemName),
        (this.Item.ItemCharge = data.itemCharge),
        (this.Item.ItemId=data.itemId);
        (this.Item.ImageId=data.imageId);
        if(data.imageContent!=null){
          console.log('image is there');
          this.imagedata='data:image/jpeg;base64,'+data.imageContent;
        }
        else{
          console.log('image is not threse')
           this.imagedata='';
        }
      
    },
    updateItem: function() {
      if (!this.Item.ItemName) {
        this.errormsg = "Please enter Item Name";
        return;
      }
      if (!this.Item.ItemCharge) {
        this.errormsg = "Please enter Item Charge";
        return;
      }
      console.log("item is in add", this.Item),
        ItemListService.patch(this.Item)
          .then((response) => {
            console.log("response", response.data),
              this.successmsg = "Item updated";
            this.editmode = false;
           
              if(this.files != '')
            {
              const files = this.files;
              MediarelatedService.uploadfile(files,this.Item.ItemId, 2)
                .then((response) => {            
                  console.log("response", response);
                })
              .catch((err) => {
                (this.errormsg = "error occured"), console.log(err.message);
              });
            }
              this.clearItem();
          })
          .catch((err) => {
            (this.errormsg = "error occured"), console.log(err.message);
          });
    },
    deleteitem: function(itemid) {
      ItemListService.deleteitem(itemid)
        .then((response) => {
          console.log("response", response.data),
            (this.successmsg = "Item deleted");
        })
        .catch((error) => {
          (this.errormsg = error.data), console.log(error.data);
        });
    },
    onError() {
      console.log("onError parent");
      this.errormsg = "";
      this.iserror = false;
    },
    clearItem: function() {
      this.Item = {
        ItemCharge: 0,
        ItemName: "",
      };
      this.isShowForm = false,
      this.editmode=false;
      this.imagedata="";
       this.files= "";
    },
    fileChange(fileList) {      
      var reader = new FileReader();                
                reader.onload = (e) => {                    
                    this.imagedata = e.target.result;
                }
        reader.readAsDataURL(fileList[0]);
      this.files = new FormData();    
      this.files.append("file", fileList[0], fileList[0].name);
    }
  
  },
};
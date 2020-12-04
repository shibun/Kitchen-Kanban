<template>
    <div>
        <section>
            <div class="breadcrumb">Item List</div>
            <div class="list-sec">
                <div class="text-right">
                    <button class="trans-btn" data-toggle="modal" data-target="#addItem">
                        <img src="../assets/images/add.png" />
                    </button>
                </div>
                <table class="custom-tbl">
                    <tbody>
                        <tr>
                            <th class="text-center">Sl No</th>
                            <th class="text-center">Item Image</th>
                            <th class="text-center">Item Name</th>                            
                            <th class="text-center">Price</th>
                            <th class="text-center">Edit</th>
                            <th class="text-center">Delete</th>
                        </tr>
                        <tr v-for="(data,index) in Items" :key="data.ItemId" v-show="Items.length>0">
                            <td class="text-center">{{index+1}}</td>
                            <td class="text-center"><img src="../assets/images/pizza.png" /></td>
                            <td>{{data.itemName}}</td>                            
                            <td class="text-right">{{data.itemCharge |toFixed |toUSD}}</td>
                            <td class="text-center">
                                <button class="trans-btn"><img src="../assets/images/edit.png" /></button>
                            </td>
                            <td class="text-center">
                                <button class="trans-btn"><img src="../assets/images/delete.png" /></button>
                            </td>
                        </tr>
                        <tr v-show="itemsnotfound">
                        No records found
                        </tr>

                       
                      
                    </tbody>
                </table>
            </div>
        </section>
         <div class="clearfix"></div>
    <div id="addItem" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add Item</h4>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>Item Name <span class="asterisk">*</span></label>
                                        <input type="text" class="form-control" v-model="ItemName">
                                    </div>
                                </div>
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>Item Price <span class="asterisk">*</span></label>
                                        <input type="number" class="form-control" v-model="ItemCharge">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-4">
                                    <div class="form-group">
                                        <label>Item Image</label>
                                        <img src="images/no_item_img.png" />
                                    </div>
                                </div>
                                <div class="col-xs-8">
                                    <button class="user-img-upload-btn">Upload</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default left-btn" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-active" data-dismiss="modal" @click="addItem">Add</button>
                </div>
            </div>
        </div>
    </div>
  <MessageSuccess v-if="itemadded" :msg="successmsg"/>
       <MessageError v-if="erroroccured" :msg="errormsg"/>
    </div>
</template>

<script>
import ItemListService from '../services/ItemListService'
import MessageSuccess from '@/components/MessageSuccess.vue'
import MessageError from '@/components/MessageError.vue'
    export default {
        name:'ItemList',
        created(){
            this.getItems()
        },
        components: {
        MessageSuccess,
        MessageError

             },
        data() {
            return {
                ItemName : "",
                ItemCharge : "",
                 itemadded:false,
                 erroroccured:false,
                 Items:[],
                 itemsnotfound:false,
                 successmsg:"",
                 errormsg:""
            }
        },
        filters: {
      
        toUSD(price){
         return `$${price}`;
        } ,
        toFixed(value){
            return value.toFixed(2);
        }
        },

        methods: {
              getItems(){
                  ItemListService.get().then(response =>  
                  {
                       if(response.data.length>0){
                    this.Items=response.data,
                     this.itemsnotfound=false      
                        }     
                         else
                         {
                      this.itemsnotfound=true
                         }
                  
                  }                  
         
                  )
              },
              addItem:function(){                
                  ItemListService.post(this.ItemName,parseFloat(this.ItemCharge)).then(response=>
                  
                  {
                       console.log('response',response.data),
                       this.successmsg="Item added",
                        this.itemadded=true                 
                       // this.$router.go()
                  } 
                  )
                  .catch(err=>{
                      this.erroroccured=true,
                      this.errormsg=err.message,
                      console.log(err.message)
                  })
              }
            }
        }
    
</script>
<template>
<div>

 <div class="add-overlay" v-if="showneworderform">
        <div class="add-pop-overlay">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"  @click="hideForm">×</button>
                <h4 class="modal-title">New Order</h4>
            </div>
            <div class="modal-body">
                <form>
                    <div class="row">
                        <div class="col-xs-6">
                            <div class="form-group">
                                <label>Customer Name <span class="asterisk">*</span></label>
                                <input type="text" class="form-control" v-model="Orderdetail.Order.CustomerName">
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <div class="form-group">
                                <label>Customer Phone <span class="asterisk">*</span></label>
                                <input type="text" class="form-control" v-model="Orderdetail.Order.CustomerConactNumber">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6">
                            <div class="form-group">
                                <label>Delivery Type <span class="asterisk">*</span></label>
                                <select class="form-control" v-model="Orderdetail.Order.OrderType">
                                    <option>Select</option>
                                    <option value=1>Dining</option>
                                    <option value=2>Take Away</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="food-order-section">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="food-ordering-header">
                                Select Item
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <input class="form-control" list="itemList" name="itemList" v-model="selecteditem" v-on:change="selectionChanged">
                            <datalist id="itemList">
                               <option v-for="item in Items" :key="item.itemId">{{item.itemName}}</option>
                            </datalist>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <table class="ordered-items-tbl">
                                <tr>
                                    <th class="text-center">Sl No</th>
                                    <th class="text-center">Item Name</th>
                                    <th class="text-center">Qty</th>
                                    <th class="text-center">Delete</th>
                                    <th class="text-center">Price</th>
                                </tr>
                                <tr>
                                    <td class="text-center">01</td>
                                    <td>Margherita</td>
                                    <td class="text-center bold">
                                        <div class="qty-main">
                                            <div class="float-left neg-qty-box">
                                                <button class="qty-btn">-</button>
                                            </div>
                                            <div class="float-left qty-box">02</div>
                                            <div class="float-left pos-qty-box">
                                                <button class="qty-btn">+</button>
                                            </div>
                                            <div class="clearfix"></div>
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <button class="trans-btn"><img src="images/delete.png" /></button>
                                    </td>
                                    <td class="text-right bold">$120.00</td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="text-center bold">Total</td>
                                    <td class="text-center bold">05</td>
                                    <td>&nbsp;</td>
                                    <td class="text-right bold">$1524.00</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default left-btn" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-active" data-dismiss="modal" @click="addOrder">Add</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import ItemListService from "../services/ItemListService";
export default {
    name:'NewOrder',
     props:['showform'],
    components:{
       // MessageError,
        //MessageSuccess
    },
    data(){
        return{
            Items:[],
            Orderdetail:{
                Order:{
                    OrderId:"",
                    OrderNumber:"",
                    OrderDate:"",
                    CustomerName:"",
                    CustomerConactNumber:"",
                    OrderAmount:0.0,
                    OrderType:1,
                    OrderStatus:1,
                    OrderTakenBy:"",
                    CancellationReason:""
                },
                OrderLines:{ }
            },
            selecteditem:'',
            selection:'',
      successmsg: "",
      errormsg: "",
      showneworderform:false
      
        };
    },
    created(){
        console.log('create method called');
    this.showneworderform=this.$props.showform;
    console.log('showneworderform status',this.showneworderform);
    this.getItems();
    },
    methods:{
         
    hideForm() {
      this.showneworderform = false;
    },
    getItems(){
      ItemListService.get().then((response) => {        
            this.Items = response.data         
        });
    },
    selectionChanged: function(element) {
    console.log("selection = "+this.selection+", new value = " + element.target.value);
    
    
    
  },
    addOrder(){
         ItemListService.post(this.Orderdetail).then((response) => {        
            console.log(response.data);       
        });
    }

    }

}
</script>
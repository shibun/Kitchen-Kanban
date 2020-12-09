<template>
    <div v-if="showneworderform">
        <div class="add-overlay" >
            <div class="add-pop-overlay">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" @click="hideForm">×</button>
                    <h4 class="modal-title">New Order</h4>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row">
                            <div class="col-xs-6">
                                <div class="form-group">
                                    <label>Customer Name </label>
                                    <input type="text" class="form-control" v-model="Orderdetail.Order.CustomerName">
                                </div>
                            </div>
                            <div class="col-xs-6">
                                <div class="form-group">
                                    <label>Customer Phone </label>
                                    <input type="text" class="form-control" v-model="Orderdetail.Order.CustomerContactNumber">
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
                                    <tr v-for="(listitem,index) in list" :key="listitem.itemId">
                                        <td class="text-center">{{index+1}}</td>
                                        <td>{{listitem.Item.itemName}}</td>
                                        <td class="text-center bold">
                                            <div class="qty-main">
                                                <div class="float-left neg-qty-box">
                                                    <button class="qty-btn" @click="decrement(listitem.OrderQuantity,index)">-</button>
                                                </div>
                                                <div class="float-left qty-box">{{listitem.OrderQuantity}}</div>
                                                <div class="float-left pos-qty-box">
                                                    <button class="qty-btn" @click="increment(listitem.OrderQuantity,index)">+</button>
                                                </div>
                                                <div class="clearfix"></div>
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <button class="trans-btn" @click="deleteorderline(listitem,index)"><img src="../assets/images/delete.png" /></button>
                                        </td>
                                        <td class="text-right bold">{{listitem.Item.itemCharge*listitem.OrderQuantity |toFixed|toUSD}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="text-center bold">Total</td>
                                        <td class="text-center bold">{{totalqty}}</td>
                                        <td>&nbsp;</td>
                                        <td class="text-right bold">{{totalamount |toFixed|toUSD}}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default left-btn" data-dismiss="modal" @click="cancelForm">Cancel</button>
                    <button type="button" class="btn btn-active" data-dismiss="modal" @click="addOrder">Add</button>
                </div>
            </div>
        </div>
        <MessageSuccess :msg="successmsg" v-on:on-success="hideForm" />
        <MessageError :msg="errormsg" v-on:on-error="onError" />
    </div>
</template>
<script>
    import ItemListService from "../services/ItemListService";
    import OrderService from "../services/OrderService";
    import MessageSuccess from "@/components/MessageSuccess.vue";
    import MessageError from "@/components/MessageError.vue";
    export default {
        name: 'NewOrder',
        props: ['isAddOrder'],
        components: {
            MessageError,
            MessageSuccess
        },
        data() {
            return {
                Items: [],
                Orderdetail: {
                    Order: {
                        OrderId: "",
                        OrderNumber: "",
                        OrderDate: new Date(),
                        CustomerName: "",
                        CustomerContactNumber: "",
                        OrderAmount: 0.0,
                        OrderType: 1,
                        OrderStatus: 1,
                        OrderTakenBy: "",
                        CancellationReason: ""
                    },
                    OrderLines: []
                },

                OrderLine: {
                    OrderLineId: "",
                    OrderId: "",
                    ItemId: "",
                    OrderQuantity: "",
                    KitchenId: "",
                    PreparedById: "",
                    Item: {
                        itemId: '',
                        itemCharge: '',
                        itemName: ''
                    }

                },
                list: [],
                selecteditem: '',
                totalamount: 0.00,
                totalqty: 0,
                selection: '',
                successmsg: "",
                errormsg: "",
                showneworderform: false

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
        created() {
            this.showneworderform = this.isAddOrder;
            this.getItems();
        },
        watch:{
            'isAddOrder'(){
                this.successmsg = "";
                 this.showneworderform = this.isAddOrder;
                 console.log('watch',this.showneworderform);
            }
            },
        methods: {
            hideForm() {
                this.$emit('update:isAddOrder',false)
                 this.showneworderform = false;
            },
            getItems() {
                (this.successmsg = false),
                ItemListService.get().then((response) => {
                    this.Items = response.data
                });
            },
            onError() {
                console.log("onError parent");
                this.errormsg = "";
                this.iserror = false;
            },
            selectionChanged: function (e) {
               
                this.Items.forEach((value, index) => {
                    if (value.itemName === e.target.value) {
                            this.OrderLine = {},
                            this.OrderLine.OrderLineId = "",
                            this.OrderLine.OrderId = "",
                            this.OrderLine.ItemId = value.itemId,
                            this.OrderLine.OrderQuantity = 1,
                            this.OrderLine.KitchenId = "",
                            this.OrderLine.PreparedById = "",
                            this.OrderLine.Item = value

                            if(this.list.length==0){
                                    this.list.push(this.OrderLine);
                                    return;
                            }
                            if(this.list.length>0){
                                let count=0;
                                this.list.forEach((value, index1) => {
                                     console.log(value.Item.itemName,e.target.value);
                                    if(value.Item.itemName==e.target.value){
                                        count=1;                                       
                                        this.increment(value.OrderQuantity,index1);
                                        return;
                                    }                                   
                                });
                                if(count==0){
                                    this.list.push(this.OrderLine);
                                }
                            }                                
                        }

                });
                this.totalCalculation();
            },
            increment: function (qty, index) {
                    this.list[index].OrderQuantity++;
                    this.Orderdetail.OrderLines = this.list;
                   this.totalCalculation();
            },
            decrement: function (qty, index) {
                        if (this.list[index].OrderQuantity > 1) {
                            this.list[index].OrderQuantity--;                            
                           this.totalCalculation();
                }
            },
            deleteorderline: function (listitem, index) {
                this.list.splice(index, 1);
                this.totalCalculation();
               
            },
            addOrder() {
                if (this.Orderdetail.OrderLines.length == 0) {
                    this.errormsg = "Please enter Items";
                    return;
                }
                console.log(this.Orderdetail);
                this.Orderdetail.Order.OrderType = parseInt(this.Orderdetail.Order.OrderType);
                OrderService.post(this.Orderdetail).then((response) => {
                    
                    this.successmsg = "Order created";
                    this.$emit('order-update')
                    this.clearOrder();
                    //this.$emit('update:isAddOrder',false)
                    })
                    .catch((err) => {
                        (this.errormsg = "error occured"), console.log(err.message);
                    });
            },
         totalCalculation:function(){
              this.Orderdetail.OrderLines = this.list;
                this.Orderdetail.Order.OrderAmount = 0.0;
                this.totalqty = 0;
                this.Orderdetail.OrderLines.forEach((value, index) => {
                    this.Orderdetail.Order.OrderAmount = parseFloat(this.Orderdetail.Order.OrderAmount) + (parseFloat(value.OrderQuantity) * parseFloat(value.Item.itemCharge));
                    this.totalqty = parseFloat(this.totalqty) + parseFloat(value.OrderQuantity);
                });

                this.totalamount = this.Orderdetail.Order.OrderAmount;
         },
        cancelForm(){
            this.clearOrder();
            this.hideForm();
        },
        clearOrder: function () {
                this.Orderdetail.Order = {
                    OrderId: "",
                    OrderNumber: "",
                    OrderDate: new Date(),
                    CustomerName: "",
                    CustomerConactNumber: "",
                    OrderAmount: 0.0,
                    OrderType: 1,
                    OrderStatus: 1,
                    OrderTakenBy: "",
                    CancellationReason: ""
                };
                this.Orderdetail.OrderLines = [];
                this.OrderLine = {
                    OrderLineId: "",
                    OrderId: "",
                    ItemId: "",
                    OrderQuantity: "",
                    KitchenId: "",
                    PreparedById: "",
                    Item: {
                        itemId: '',
                        itemCharge: '',
                        itemName: ''
                    }
                };
                this.list = [];
                this.selecteditem = '';
            }
        }

    }
</script>
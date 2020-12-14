<template>
    <div v-if="isAddOrder">
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
                                    <input type="text" class="form-control" v-model="Orderdetail.Order.customerName">
                                </div>
                            </div>
                            <div class="col-xs-6">
                                <div class="form-group">
                                    <label>Customer Phone </label>
                                    <input type="text" class="form-control" v-model="Orderdetail.Order.customerContactNumber">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-6">
                                <div class="form-group">
                                    <label>Delivery Type <span class="asterisk">*</span></label>
                               
                                    <input type="text"  class="form-control" :value="TakeAway" :readOnly="true">
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
                                        <th class="text-center">Item Price</th>
                                         <th class="text-center">&nbsp;</th>
                                        <th class="text-center">Delete</th>
                                    </tr>
                                    <tr v-for="(listitem,index) in list" :key="listitem.itemId">
                                        <td class="text-center">{{index+1}}</td>
                                        <td>{{listitem.item.itemName}}</td>
                                        <td class="text-center bold">
                                            <div class="qty-main">
                                                <div class="float-left neg-qty-box">
                                                    <button class="qty-btn" @click="decrement(listitem.orderQuantity,index)">-</button>
                                                </div>
                                                <div class="float-left qty-box">{{listitem.orderQuantity}}</div>
                                                <div class="float-left pos-qty-box">
                                                    <button class="qty-btn" @click="increment(listitem.orderQuantity,index)">+</button>
                                                </div>
                                                <div class="clearfix"></div>
                                            </div>
                                        </td>        
                                        <td class="text-right bold">{{listitem.item.itemCharge |toFixed|toUSD}}</td>
                                        <td class="text-right bold">{{listitem.item.itemCharge*listitem.orderQuantity |toFixed|toUSD}}</td>
                                        <td class="text-center">
                                                    <button class="trans-btn" @click="deleteorderline(listitem,index)"><img src="../assets/images/delete.png" /></button>
                                                </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="text-center bold">Total</td>
                                        <td class="text-center bold">{{totalqty}}</td>
                                        <td>&nbsp;</td>
                                        <td class="text-right bold">{{totalamount |toFixed|toUSD}}</td>
                                         <td>&nbsp;</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default left-btn" data-dismiss="modal" @click="cancelForm">Cancel</button>
                    <button v-if="!this.editorderid" type="button" class="btn btn-active" data-dismiss="modal" @click="addOrder">Add</button>
                    <button v-if="this.editorderid" type="button" class="btn btn-active" data-dismiss="modal" @click="updateOrder">Update</button>
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
    import Vue from 'vue'
    export default {
        name: 'NewOrder',
        props: ['isAddOrder','editorderid'],
        components: {
            MessageError,
            MessageSuccess
        },
        data() {
            return {
                Items: [],
                TakeAway:"TakeAway",
                Orderdetail: {
                    Order: {
                        OrderId: "",
                        OrderNumber: "",
                        OrderDate: new Date(),
                        customerName: "",
                        customerContactNumber: "",
                        OrderAmount: 0.0,
                        orderType: 2,
                        OrderStatus: 1,
                        OrderTakenBy: "",
                        CancellationReason: ""
                    },
                    OrderLines: []
                },

                OrderLine: {
                    orderLineId: "",
                    orderId: "",
                    itemId: "",
                    orderQuantity: "",
                    kitchenId: "",
                    preparedById: "",
                    item: {
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

            };
        },
        created() {
            this.getItems();
        },
        watch:{
            'isAddOrder'(){
                this.successmsg = "";
               
            },
            'editorderid'(){
                 this.successmsg = "";
                 if(this.editorderid)
                 this.getOrderDetails(this.editorderid);
            }
            },
        methods: {
            hideForm() {
                this.$emit('clear-add-form');
            },
            getItems() {
                (this.successmsg = false),
                ItemListService.get().then((response) => {
                    this.Items = response.data
                });
            },
            getOrderDetails(orderid) {
                OrderService
                    .getOrderById(orderid)
                    .then((response) => {
                            this.orderdetails = response.data;
                            console.log(this.orderdetails);
                            Vue.set(this.Orderdetail, "Order", response.data.order);
                            Vue.set(this.Orderdetail,"OrderLines", response.data.orderLines);
                            this.list=response.data.orderLines;
                               this.totalCalculation();
                            console.log('list',this.list);
                            })
                    .catch((err) => {
                    (this.errormsg = err.messge), console.log(err.message);
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
                            this.OrderLine.orderLineId = "",
                            this.OrderLine.orderId = "",
                            this.OrderLine.itemId = value.itemId,
                            this.OrderLine.orderQuantity = 1,
                            this.OrderLine.kitchenId = "",
                            this.OrderLine.preparedById = "",
                            this.OrderLine.item = value

                            if(this.list.length==0){
                                    this.list.push(this.OrderLine);
                                    return;
                            }
                            if(this.list.length>0){
                                let count=0;
                                this.list.forEach((value, index1) => {
                                     console.log(value.item.itemName,e.target.value);
                                    if(value.item.itemName==e.target.value){
                                        count=1;                                       
                                        this.increment(value.orderQuantity,index1);
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
                    this.list[index].orderQuantity++;
                    this.Orderdetail.OrderLines = this.list;
                   this.totalCalculation();
            },
            decrement: function (qty, index) {
                        if (this.list[index].orderQuantity > 1) {
                            this.list[index].orderQuantity--;                            
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
                this.Orderdetail.Order.orderType = parseInt(this.Orderdetail.Order.orderType);
                OrderService.addOrder(this.Orderdetail).then((response) => {
                    
                    this.successmsg = "Order created";
                    this.$emit('order-update')
                    this.clearOrder();
                    //this.$emit('update:isAddOrder',false)
                    })
                    .catch((err) => {
                        (this.errormsg = "error occured"), console.log(err.message);
                    });
            },
             updateOrder() {
                if (this.Orderdetail.OrderLines.length == 0) {
                    this.errormsg = "Please enter Items";
                    return;
                }
                console.log(this.Orderdetail);
                this.Orderdetail.Order.orderType = parseInt(this.Orderdetail.Order.orderType);
                OrderService.updateOrder(this.Orderdetail).then((response) => {
                    
                    this.successmsg = "Order updated";
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
                this.Orderdetail.Order.orderAmount = 0.0;
                this.totalqty = 0;
                this.Orderdetail.OrderLines.forEach((value, index) => {
                    this.Orderdetail.Order.orderAmount = parseFloat(this.Orderdetail.Order.orderAmount) + (parseFloat(value.orderQuantity) * parseFloat(value.item.itemCharge));
                    this.totalqty = parseFloat(this.totalqty) + parseFloat(value.orderQuantity);
                });

                this.totalamount = this.Orderdetail.Order.orderAmount;
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
                    customerName: "",
                    CustomerConactNumber: "",
                    OrderAmount: 0.0,
                    orderType: 1,
                    OrderStatus: 1,
                    OrderTakenBy: "",
                    CancellationReason: ""
                };
                this.Orderdetail.OrderLines = [];
                this.OrderLine = {
                    orderLineId: "",
                    orderId: "",
                    itemId: "",
                    orderQuantity: "",
                    kitchenId: "",
                    preparedById: "",
                    item: {
                        itemId: '',
                        itemCharge: '',
                        itemName: ''
                    }
                };
                this.list = [];
                this.selecteditem = '';
                 this.totalamount= 0.00;
                this.totalqty= 0;

            }
        }

    }
</script>
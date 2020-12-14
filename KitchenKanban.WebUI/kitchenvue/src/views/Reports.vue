<template>
<div>
 <div>
        <section>
            <div class="breadcrumb">
                <div>Reports</div>
            </div>
            <div class="list-sec">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-3">
                            &nbsp;
                        </div>
                        <div class="col-xs-6 text-center current-date">
                            {{currentdate |toDate}}
                        </div>
                        <div class="col-xs-3">
                            <input type="search" placeholder="Search Order" class="form-control" v-model.lazy="search" />
                        </div>
                    </div>
                </div>
                <table class="custom-tbl">
                    <tr>
                        <th class="text-center">Sl No</th>
                        <th class="text-center">Order No</th>
                        <th class="text-center">Order Time</th>
                        <th class="text-center">No of Dishes</th>
                        <th class="text-center">Order Taken By</th>
                        <th class="text-center">Order Value</th>
                        <th class="text-center">Order Status</th>
                        <th class="text-center">Detail</th>
                    </tr>
                    <tr class="custom-btl-row" v-for="(order,index) in filteredItems" :key="order.orderNumber">
                        <td class="text-center">{{index+1}}</td>
                        <td>{{order.orderNumber}}</td>
                        <td>{{order.orderDate |toTime }}</td>
                        <td class="text-center">{{order.noOfItemsInOrder}}</td>
                        <td>{{order.orderTakenByUserName}}</td>
                        <td class="text-right">{{order.orderAmount | toFixed | toUSD }}</td>
                        <td class="text-center">
                        <span v-if="order.orderStatus==1">NewOrder</span>
                        <span v-if="order.orderStatus==2">BeingPrepared</span>
                        <span v-if="order.orderStatus==3">Prepared</span>
                        <span v-if="order.orderStatus==4">Packing</span>
                        <span v-if="order.orderStatus==5">ReadyToBeDelivered</span>
                        <span v-if="order.orderStatus==6">Completed</span>
                        <span  class="cancelled-order-status" v-if="order.orderStatus==7" >Cancelled</span>
                        </td>
                        <td class="text-center">
                            <button class="trans-btn" data-toggle="modal" data-target="#reportDetail" @click="getOrderById(order.orderId)"><i class="glyphicon glyphicon-exclamation-sign"></i></button>
                        </td>
                    </tr>
                       <tr class="custom-btl-row">
                        <td colspan="3">&nbsp;</td>
                        <td class="text-center bold">{{totalqty}}</td>
                        <td class="text-right bold">Total</td>
                        <td class="text-right bold">{{totalamount |toFixed|toUSD}}</td>
                        <td colspan="2">&nbsp;</td>
                    </tr>
                    
                </table>
            </div>
        </section>
        <div class="clearfix"></div>
    </div>


    <div id="reportDetail" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">{{orderdetail.order.orderNumber}}</h4>
                </div>
                <div class="modal-body">
                    <table class="report-tbl">
                        <tr>
                            <th>Status</th>
                            <td>
                            <span v-if="orderdetail.order.orderStatus==1">NewOrder</span>
                            <span v-if="orderdetail.order.orderStatus==2">BeingPrepared</span>
                            <span v-if="orderdetail.order.orderStatus==3">Prepared</span>
                            <span v-if="orderdetail.order.orderStatus==4">Packing</span>
                            <span v-if="orderdetail.order.orderStatus==5">ReadyToBeDelivered</span>
                            <span v-if="orderdetail.order.orderStatus==6">Completed</span>
                            <span  class="cancelled-order-status" v-if="orderdetail.order.orderStatus==7" >Cancelled</span>
   
                            </td>
                            <th>Ordered Date</th>
                            <td>{{orderdetail.order.orderDate |toDate}}</td>
                        </tr>
                        <tr>
                            <th>Ordered Time</th>
                            <td>{{orderdetail.order.orderDate|toTime}}</td>
                            <th>Delivered Time</th>
                            <td><span v-if="orderdetail.order.orderDeliveryDate==null">  </span>
                            <span v-else>{{orderdetail.order.orderDeliveryDate |toTime}}</span></td>
                        </tr>
                        <tr>
                            <th>Ordered Taken By</th>
                            <td>{{orderdetail.order.orderTakenByUserName}}</td> 
                            <th>Customer Phone No</th>
                            <td>{{orderdetail.order.customerContactNumber?orderdetail.order.customerContactNumber.substring(0,4)+"*****":''}}</td> 
                        </tr>                       
                        <tr>
                            <th>Customer Name</th>
                            <td>{{orderdetail.order.customerName?orderdetail.order.customerName.substring(0,3)+"*****":''}}</td>
                           
                        </tr>
                    </table>

                    <h5 class="order-dtls">Order Details</h5>
                    <table class="custom-tbl">
                        <tr>
                            <th class="text-center"></th>
                            <th class="text-center">Item Name</th>
                            <th class="text-center">Quantity</th>
                            <th class="text-center">Price</th>
                        </tr>
                        <tr v-for="(data,index) in orderdetail.orderLines" :key="data.itemId">
                            <td class="text-center">{{index+1}}</td>
                            <td>{{data.itemName}}</td>
                            <td class="text-center">{{data.orderQuantity}}</td>
                            <td class="text-right">{{(data.orderQuantity)*(data.itemCharge)|toFixed|toUSD}}</td>
                        </tr>
                       
                        
                        <tr>
                            <td class="bold ">&nbsp;</td>
                            <td class="bold">&nbsp;</td>
                            <td class="bold text-center">{{totalitemcount}}</td>
                            <td class="bold text-right">{{totalitemamount|toFixed|toUSD}}</td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import MessageSuccess from "@/components/MessageSuccess.vue";
import MessageError from "@/components/MessageError.vue";
import OrderService from "../services/OrderService";
import moment from 'moment';
export default {
  name: "Reports",
  created() {
   this.getAllOrders();
  },
  data(){
      return{
            orders:[],
            filteredItems:[],
            totalamount:0.0,
            totalqty:0,  
            orderdetail:{
                order:{},
                orderLines:[]
            },
            currentdate:new Date(),
            totalitemamount:0.0,
            totalitemcount:0,   
            search:''      
      }
     
  },
  filters: {
    toUSD(price) {
      return `$${price}`;
    },
    toFixed(value) {
      return value.toFixed(2);
    },
    toTime(value){
         return moment(String(value)).format(' hh:mm a')
    },
    toDate(value){
        return moment(String(value)).format(' MM/DD/YYYY')
    }
  },
 watch:{
      search:function(newval,oldvalue){
          if(newval){
               this.filteredItems=this.orders.filter(function (order) {  return order.orderNumber.includes(newval)});
          }
          else
          {
              this.filteredItems=this.orders;
          }
          
          
      }
  },
  methods:{
      getAllOrders:function(){
        OrderService.get().then((response) => {       
            (this.orders = response.data); 
            this.filteredItems=response.data;
            this.totalamount=0.0;
            this.totalqty = 0;
                this.orders.forEach((value, index) => {
                    this.totalamount = this.totalamount + parseFloat(value.orderAmount);
                    this.totalqty = parseInt(this.totalqty) + parseInt(value.noOfItemsInOrder);
                });            
              });
      },
      getOrderById:function(orderId){
          OrderService.getOrderById(orderId).then((response)=>{
              this.orderdetail.order=response.data.order;
              this.orderdetail.orderLines=response.data.orderLines;
              this.totalitemcount = 0;
              this.totalitemamount=0.0;
                this.orderdetail.orderLines.forEach((value, index) => {
                    this.totalitemamount = this.totalitemamount + (parseFloat(value.itemCharge)*(value.orderQuantity));
                    this.totalitemcount = parseInt(this.totalitemcount) + parseInt(value.orderQuantity);
                }); 
          });
      }
  }
 
};
</script>


   
   


    



<template>
  <div>
    <section>
      <div class="breadcrumb">
        <div>Dashboard</div>
      </div>
      <div class="kanban-sec">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xs-9"></div>
            <div class="col-xs-3">
              <input
                type="search"
                placeholder="Search Order"
                class="form-control"
              />
            </div>
          </div>
        </div>
        <div class="kb-main">
          <div class="kb-column">
            <div class="kb-column-header">
              <div class="float-left" v-if="neworders">
                New Order
                <span class="order-count" >{{neworders.orderCount || 0 }}</span>
              </div>
              <div class="float-right">
                <button class="add-order" @click="showForm">+</button>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="ticket-sec">
              <div
                id="ordermaindivno"
                class="ticket-main"
                v-bind:key="index"
                v-for="(order, index) in neworders.orders"
              >
                <div
                  class="order-detail"
                  @click="toggleOrderDetails(order, index,'no')"
                >
                  <div>
                    <div class="float-left">
                      {{ order.orderId }} [ {{ order.orderDate | formatTime }}]
                    </div>
                    <div class="float-right" v-if="order.orderType == 1">
                      DineIn
                    </div>
                    <div class="float-right" v-if="order.orderType == 2">
                      Delivery
                    </div>
                    <div class="clearfix"></div>
                  </div>

                  <div>
                    <div class="float-left">{{ order.customerName }}</div>
                    <div class="float-right">
                      {{ order.customerContactNumber }}
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
                <div
                  :id="'orderdetailsdivno' + index"
                  class="order-description"
                  style="display:none;"
                >
                  <table class="order-tbl" v-if="order.orderLines">
                    <tbody>
                      <tr class="order-tbl-header">
                        <td class="text-center">Item Name</td>
                        <td class="text-center">Qty</td>
                        <td class="text-center">Price</td>
                      </tr>
                      <tr 
                        v-bind:key="index"
                        v-for="(orderline, index) in order.orderLines"
                      >
                        <td>{{ orderline.itemName }}</td>
                        <td class="text-center">
                          {{ orderline.orderQuantity }}
                        </td>
                        <td class="text-right">{{ orderline.itemCharge }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="top6">
                    <div class="float-right">
                      <div class="dropup tkt-left-btn">
                        <button
                          class="move-order-btn dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                        >
                          Move To
                          <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                          <li
                            v-bind:key="index"
                            v-for="(item, index) in orderStatus"
                            v-bind:value="item.id"
                          >
                            <a href="#" @click="changeOrderStatus(order.orderId,item.id,'')">{{ item.value }}</a>
                          </li>
                        </ul>
                      </div>
                      <button
                        @click="editOrder(order)"
                        class="edit-order-btn tkt-left-btn"
                      >
                        Edit Order
                      </button>
                      <button class="cancel-order-btn"  @click="changeOrderStatus(order.orderId,7,'Incorrect order')">Cancel Order</button>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kb-column">
            <div class="kb-column-header">
              Being Prepared <span class="order-count">0</span>
            </div>
            <div class="ticket-sec" v-if="beingpreparedorders">
              <div class="ticket-main"
               id="ordermaindivbp"
                v-bind:key="bpindex+5"
                v-for="(bporder, bpindex) in beingpreparedorders.orders"
              >
                <div class="order-detail"  @click="toggleOrderDetails(bporder, bpindex,'bp')">
                <div>
                    <div class="float-left">
                      {{ bporder.orderId }} [ {{ bporder.orderDate | formatTime }}]
                    </div>
                    <div class="float-right" v-if="bporder.orderType == 1">
                      DineIn
                    </div>
                    <div class="float-right" v-if="bporder.orderType == 2">
                      Delivery
                    </div>
                    <div class="clearfix"></div>
                  </div>

                  <div>
                    <div class="float-left">{{ bporder.customerName }}</div>
                    <div class="float-right">
                      {{ bporder.customerContactNumber }}
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
                <div
                  :id="'orderdetailsdivbp' + bpindex"
                  class="order-description"
                  style="display:none;"
                >
                  <table class="order-tbl" v-if="bporder.orderLines">
                    <tbody>
                      <tr class="order-tbl-header">
                        <td class="text-center">Item Name</td>
                        <td class="text-center">Qty</td>
                        <td class="text-center">Price</td>
                      </tr>
                      <tr
                        v-bind:key="index"
                        v-for="(orderline, index) in bporder.orderLines"
                      >
                        <td>{{ orderline.itemName }}</td>
                        <td class="text-center">
                          {{ orderline.orderQuantity }}
                        </td>
                        <td class="text-right">{{ orderline.itemCharge }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="top6">
                    <div class="float-right">
                      <div class="dropup tkt-left-btn">
                        <button
                          class="move-order-btn dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                        >
                          Move To
                          <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                          <li
                            v-bind:key="index"
                            v-for="(item, index) in orderStatus"
                            v-bind:value="item.id"
                          >
                            <a href="#" @click="changeOrderStatus(bporder.orderId,item.id,'')">{{ item.value }}</a>
                          </li>
                        </ul>
                      </div>
                      <button
                        @click="editOrder(bporder)"
                        class="edit-order-btn tkt-left-btn"
                      >
                        Edit Order
                      </button>
                      <button class="cancel-order-btn"  @click="changeOrderStatus(bporder.orderId,7,'Incorrect order')">Cancel Order</button>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kb-column">
            <div class="kb-column-header">
              Prepared <span class="order-count">{{ preparedorders && preparedorders.orderCount || 0}}</span>
            </div>
            <div class="ticket-sec" v-if="preparedorders">
              <div class="ticket-main"
              id="ordermaindivpo"
                v-bind:key="index"
                v-for="(order, index) in preparedorders.orders"
              >
                <div class="order-detail" @click="toggleOrderDetails(order, index,'po')">
                  
                 <div>
                    <div class="float-left">
                      {{ order.orderId }} [ {{ order.orderDate | formatTime }}]
                    </div>
                    <div class="float-right" v-if="order.orderType == 1">
                      DineIn
                    </div>
                    <div class="float-right" v-if="order.orderType == 2">
                      Delivery
                    </div>
                    <div class="clearfix"></div>
                  </div>

                  <div>
                    <div class="float-left">{{ order.customerName }}</div>
                    <div class="float-right">
                      {{ order.customerContactNumber }}
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
                <div
                  :id="'orderdetailsdivpo' + index"
                  class="order-description"
                  style="display:none;"
                >
                  <table class="order-tbl" v-if="order.orderLines">
                    <tbody>
                      <tr class="order-tbl-header">
                        <td class="text-center">Item Name</td>
                        <td class="text-center">Qty</td>
                        <td class="text-center">Price</td>
                      </tr>
                      <tr 
                        v-bind:key="index"
                        v-for="(orderline, index) in order.orderLines"
                      >
                        <td>{{ orderline.itemName }}</td>
                        <td class="text-center">
                          {{ orderline.orderQuantity }}
                        </td>
                        <td class="text-right">{{ orderline.itemCharge }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="top6">
                    <div class="float-right">
                      <div class="dropup tkt-left-btn">
                        <button
                          class="move-order-btn dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                        >
                          Move To
                          <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                          <li
                            v-bind:key="index"
                            v-for="(item, index) in orderStatus"
                            v-bind:value="item.id"
                          >
                            <a href="#" @click="changeOrderStatus(order.orderId,item.id,'')">{{ item.value }}</a>
                          </li>
                        </ul>
                      </div>
                      <button
                        @click="editOrder(order)"
                        class="edit-order-btn tkt-left-btn"
                      >
                        Edit Order
                      </button>
                      <button class="cancel-order-btn"  @click="changeOrderStatus(order.orderId,7,'Incorrect order')">Cancel Order</button>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kb-column">
            <div class="kb-column-header">
              Packing <span class="order-count">{{packingorders && packingorders.orderCount}}</span>
            </div>
            <div class="ticket-sec" v-if="packingorders">
              <div class="ticket-main"
               id="ordermaindivko"
                v-bind:key="index"
                v-for="(order, index) in packingorders.orders"
              >
                <div class="order-detail" @click="toggleOrderDetails(order, index,'ko')">
              <div>
                    <div class="float-left">
                      {{ order.orderId }} [ {{ order.orderDate | formatTime }}]
                    </div>
                    <div class="float-right" v-if="order.orderType == 1">
                      DineIn
                    </div>
                    <div class="float-right" v-if="order.orderType == 2">
                      Delivery
                    </div>
                    <div class="clearfix"></div>
                  </div>

                  <div>
                    <div class="float-left">{{ order.customerName }}</div>
                    <div class="float-right">
                      {{ order.customerContactNumber }}
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
                <div
                  :id="'orderdetailsdivko' + index"
                  class="order-description"
                  style="display:none;"
                >
                  <table class="order-tbl" v-if="order.orderLines">
                    <tbody>
                      <tr class="order-tbl-header">
                        <td class="text-center">Item Name</td>
                        <td class="text-center">Qty</td>
                        <td class="text-center">Price</td>
                      </tr>
                      <tr 
                        v-bind:key="index"
                        v-for="(orderline, index) in order.orderLines"
                      >
                        <td>{{ orderline.itemName }}</td>
                        <td class="text-center">
                          {{ orderline.orderQuantity }}
                        </td>
                        <td class="text-right">{{ orderline.itemCharge }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="top6">
                    <div class="float-right">
                      <div class="dropup tkt-left-btn">
                        <button
                          class="move-order-btn dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                        >
                          Move To
                          <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                          <li
                            v-bind:key="index"
                            v-for="(item, index) in orderStatus"
                            v-bind:value="item.id"
                          >
                            <a href="#" @click="changeOrderStatus(order.orderId,item.id,'')">{{ item.value }}</a>
                          </li>
                        </ul>
                      </div>
                      <button
                        @click="editOrder(order)"
                        class="edit-order-btn tkt-left-btn"
                      >
                        Edit Order
                      </button>
                      <button class="cancel-order-btn"  @click="changeOrderStatus(order.orderId,7,'Incorrect order')">Cancel Order</button>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="kb-column">
            <div class="kb-column-header">
              Ready for Delivery<span class="order-count">{{readyorders && readyorders.orderCount || 0}}</span>
            </div>
            <div class="ticket-sec" v-if="readyorders">
              <div class="ticket-main"
               id="ordermaindivro"
                v-bind:key="index"
                v-for="(order, index) in readyorders.orders"
      
              >
                <div class="order-detail" @click="toggleOrderDetails(order, index,'ro')">
                    <div>
                    <div class="float-left">
                      {{ order.orderId }} [ {{ order.orderDate | formatTime }}]
                    </div>
                    <div class="float-right" v-if="order.orderType == 1">
                      DineIn
                    </div>
                    <div class="float-right" v-if="order.orderType == 2">
                      Delivery
                    </div>
                    <div class="clearfix"></div>
                  </div>

                  <div>
                    <div class="float-left">{{ order.customerName }}</div>
                    <div class="float-right">
                      {{ order.customerContactNumber }}
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
                <div
                  :id="'orderdetailsdivro' + index"
                  class="order-description"
                  style="display:none;"
                >
                  <table class="order-tbl" v-if="order.orderLines">
                    <tbody>
                      <tr class="order-tbl-header">
                        <td class="text-center">Item Name</td>
                        <td class="text-center">Qty</td>
                        <td class="text-center">Price</td>
                      </tr>
                      <tr 
                        v-bind:key="index"
                        v-for="(orderline, index) in order.orderLines"
                      >
                        <td>{{ orderline.itemName }}</td>
                        <td class="text-center">
                          {{ orderline.orderQuantity }}
                        </td>
                        <td class="text-right">{{ orderline.itemCharge }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="top6">
                    <div class="float-right">
                      <button class="edit-order-btn" @click="changeOrderStatus(order.orderId,6,'')">Deliver</button>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>

              <div class="ticket-main delivered-tkt">
                <div class="order-detail">
                  <div>
                    <div class="float-left">123456 [ 15:46 ]</div>
                    <div class="float-right">Take Away</div>
                    <div class="clearfix"></div>
                  </div>
                  <div>
                    <div class="float-left">Pramod Karkera</div>
                    <div class="float-right">9844217817</div>
                    <div class="clearfix"></div>
                  </div>
                  <div class="delivered-status">Delivered</div>
                </div>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </section>
    <div class="clearfix"></div>
    <NewOrder :isAddOrder.sync="isAddOrder" />
  </div>
</template>
<script>
//import MessageSuccess from "@/components/MessageSuccess.vue";
//import MessageError from "@/components/MessageError.vue";
import NewOrder from "@/components/NewOrder.vue";
import dashBoardService from "../services/dashboardService";
import $ from "jquery";
import Vue from 'vue'
export default {
  name: "Dashboard",
  components: {
    // MessageError,
    //MessageSuccess,
    NewOrder,
  },
  created() {
    this.getKanboard();
  },
  data() {
    return {
      kanboards: null,
      neworders: [],

      beingpreparedorders: [],
      preparedorders: {},
   
      packingorders: [],
      readyorders: [],
      successmsg: "",
      errormsg: "",
      isAddOrder: false,
      orderdetails: {},
      editorder: null,

      orderStatus: [
        { id: 1, value: "New Order" },
        { id: 2, value: "Being Prepared" },
        { id: 3, value: "Prepared" },
        { id: 4, value: "Packing" },
        { id: 5, value: "Ready for Delivery" },
      ],
    };
  },
  methods: {
    showForm() {
      console.log("showForm method called");
      this.isAddOrder = true;
      console.log(this.isAddOrder)
    },
    getFilteredStatus(){

    },
    getKanboard() {
      this.successmsg = "";
      dashBoardService
        .getKanboard()
        .then((response) => {
          this.kanboards = response.data;
           this.beingpreparedorders = response.data.filter(
            (item) => item.bucketName === 'Being Prepared')[0];
          if(response.data && response.data.length>0){
              this.neworders = response.data.filter(
                          (item) => item.bucketName === 'New Order'
                        )[0];
        
          
         
          this.preparedorders = response.data.filter(
            (item) => item.bucketName === 'Prepared'
          )[0];
          this.packingorders = response.data.filter(
            (item) => item.bucketName === 'Packing'
          )[0];
          this.readyorders = response.data.filter(
            (item) => item.bucketName === 'Ready To Be Delivered'
          )[0];

          // console.log('bp',this.beingpreparedorders);
          // console.log('no',this.neworders);
          }
        })
        .catch((err) => {
          (this.errormsg = err.messge), console.log(err.message);
        });
    },
    getOrderDetails(data) {
      dashBoardService
        .getOrderDetails(data.orderId)
        .then((response) => {
          this.orderdetails = response.data;
          console.log('assign',this.orderdetails);
          //var obj = this.neworders.orders.filter(item=>item.orderId === id)[0];
          //data.orderLines=response.data.orderLines
          Vue.set(data, 'orderLines', response.data.orderLines)
          
          console.log('assign1',data);
        })
        .catch((err) => {
          (this.errormsg = err.messge), console.log(err.message);
        });
    },
    toggleOrderDetails(order, index,dividentifier) {
      this.showorderdetails = !this.showorderdetails;
      this.getOrderDetails(order);
      console.log("#orderdetailsdiv" + dividentifier+index);
      $("#orderdetailsdiv" + dividentifier+index).slideToggle();
    },
    editOrder(data) {
      this.editorder = data;
      console.log("editorder", data);
    },
    changeOrderStatus(orderid,statusid,reason){

       var orderStatus={
         orderId:orderid,
          OrderStatus:statusid,
          cancellationReason:reason
       }
       dashBoardService
        .updateOrderStatus(orderStatus)
        .then((response) => {
          this.successmsg = "Order Updated.";
          this.getKanboard();
          console.log(response.data);
        })
        .catch((err) => {
          (this.errormsg = err.messge), console.log(err.message);
        });
    }
  },
};
</script>
<style scoped></style>

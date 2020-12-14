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
              <div class="float-left">
                New Order
                <span class="order-count">{{
                  (neworders && neworders.orderCount) || 0
                }}</span>
              </div>
              <div class="float-right">
                <button class="add-order" @click="showForm">+</button>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="ticket-sec" v-if="neworders">
              <div
                id="ordermaindivno"
                class="ticket-main"
                v-bind:key="index"
                v-for="(order, index) in neworders.orders"
              >
                <div
                  class="order-detail"
                  @click="
                    toggleOrderDetails(order, index, 'no', neworders.bucketName)
                  "
                >
                  <div>
                    <div class="float-left">
                      {{ order.orderNumber.split("-")[1] }} [
                      {{ order.orderDate | formatTime }}]
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
                        <ul class="dropdown-menu" v-if="order.orderStatus">
                          <li
                            v-bind:key="index"
                            v-for="(item, index) in order.orderStatus"
                            v-bind:value="item.id"
                          >
                            <a
                              href="#"
                              @click="
                                showWarning(order.orderId, item.id, '')
                              "
                              >{{ item.value }}</a
                            >
                          </li>
                        </ul>
                      </div>
                      <button
                        @click="editOrder(order.orderId)"
                        class="edit-order-btn tkt-left-btn"
                      >
                        Edit Order
                      </button>
                      <button
                        class="cancel-order-btn"
                        @click="
                          changeOrderStatus(order.orderId, 7, 'Incorrect order')
                        "
                      >
                        Cancel Order
                      </button>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kb-column">
            <div class="kb-column-header">
              Being Prepared
              <span class="order-count">{{
                (beingpreparedorders && beingpreparedorders.rowCount) || 0
              }}</span>
            </div>
            <div class="ticket-sec" v-if="beingpreparedorders">
              <div
                class="ticket-main"
                id="ordermaindivbp"
                v-bind:key="bpindex + 5"
                v-for="(bporder, bpindex) in beingpreparedorders.orders"
              >
                <div
                  class="order-detail"
                  @click="
                    toggleOrderDetails(
                      bporder,
                      bpindex,
                      'bp',
                      beingpreparedorders.bucketName
                    )
                  "
                >
                  <div>
                    <div class="float-left">
                      {{ bporder.orderNumber.split("-")[1] }} [
                      {{ bporder.orderDate | formatTime }}]
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
                        <ul class="dropdown-menu" v-if="bporder.orderStatus">
                          <li
                            v-bind:key="index"
                            v-for="(item, index) in bporder.orderStatus"
                            v-bind:value="item.id"
                          >
                            <a
                              href="#"
                              @click="
                                changeOrderStatus(bporder.orderId, item.id, '')
                              "
                              >{{ item.value }}</a
                            >
                          </li>
                        </ul>
                      </div>

                      <button
                        class="cancel-order-btn"
                        @click="
                          changeOrderStatus(
                            bporder.orderId,
                            7,
                            'Incorrect order'
                          )
                        "
                      >
                        Cancel Order
                      </button>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kb-column">
            <div class="kb-column-header">
              Prepared
              <span class="order-count">{{
                (preparedorders && preparedorders.orderCount) || 0
              }}</span>
            </div>
            <div class="ticket-sec" v-if="preparedorders">
              <div
                class="ticket-main"
                id="ordermaindivpo"
                v-bind:key="index"
                v-for="(order, index) in preparedorders.orders"
              >
                <div
                  class="order-detail"
                  @click="
                    toggleOrderDetails(
                      order,
                      index,
                      'po',
                      preparedorders.bucketName
                    )
                  "
                >
                  <div>
                    <div class="float-left">
                      {{ order.orderNumber.split("-")[1] }} [
                      {{ order.orderDate | formatTime }}]
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
                        <ul class="dropdown-menu" v-if="order.orderStatus">
                          <li
                            v-bind:key="index"
                            v-for="(item, index) in order.orderStatus"
                            v-bind:value="item.id"
                          >
                            <a
                              href="#"
                              @click="
                                changeOrderStatus(order.orderId, item.id, '')
                              "
                              >{{ item.value }}</a
                            >
                          </li>
                        </ul>
                      </div>
                      <button
                        class="edit-order-btn"
                        @click="changeOrderStatus(order.orderId, 6, '')"
                      >
                        Deliver
                      </button>
                      <button
                        v-if="false"
                        @click="editOrder(order.orderId)"
                        class="edit-order-btn tkt-left-btn"
                      >
                        Edit Order
                      </button>
                      <button
                        v-if="false"
                        class="cancel-order-btn"
                        @click="
                          changeOrderStatus(order.orderId, 7, 'Incorrect order')
                        "
                      >
                        Cancel Order
                      </button>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kb-column">
            <div class="kb-column-header">
              Packing
              <span class="order-count">{{
                (packingorders && packingorders.orderCount) || 0
              }}</span>
            </div>
            <div class="ticket-sec" v-if="packingorders">
              <div
                class="ticket-main"
                id="ordermaindivko"
                v-bind:key="index"
                v-for="(order, index) in packingorders.orders"
              >
                <div
                  class="order-detail"
                  @click="
                    toggleOrderDetails(
                      order,
                      index,
                      'ko',
                      packingorders.bucketName
                    )
                  "
                >
                  <div>
                    <div class="float-left">
                      {{ order.orderNumber.split("-")[1] }} [
                      {{ order.orderDate | formatTime }}]
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
                        <ul class="dropdown-menu" v-if="order.orderStatus">
                          <li
                            v-bind:key="index"
                            v-for="(item, index) in order.orderStatus"
                            v-bind:value="item.id"
                          >
                            <a
                              href="#"
                              @click="
                                changeOrderStatus(order.orderId, item.id, '')
                              "
                              >{{ item.value }}</a
                            >
                          </li>
                        </ul>
                      </div>
                      <button
                        v-if="false"
                        @click="editOrder(order.orderId)"
                        class="edit-order-btn tkt-left-btn"
                      >
                        Edit Order
                      </button>
                      <button
                        v-if="false"
                        class="cancel-order-btn"
                        @click="
                          changeOrderStatus(order.orderId, 7, 'Incorrect order')
                        "
                      >
                        Cancel Order
                      </button>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="kb-column">
            <div class="kb-column-header">
              Ready for Delivery<span class="order-count">{{
                (readyorders && readyorders.orderCount) || 0
              }}</span>
            </div>
            <div class="ticket-sec" v-if="readyorders">
              <div
                class="ticket-main"
                id="ordermaindivro"
                v-bind:key="index"
                v-for="(order, index) in readyorders.orders"
              >
                <div
                  class="order-detail"
                  @click="
                    toggleOrderDetails(
                      order,
                      index,
                      'ro',
                      readyorders.bucketName
                    )
                  "
                >
                  <div>
                    <div class="float-left">
                      {{ order.orderNumber.split("-")[1] }} [
                      {{ order.orderDate | formatTime }}]
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
                      <button
                        class="edit-order-btn"
                        @click="changeOrderStatus(order.orderId, 6, '')"
                      >
                        Deliver
                      </button>
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
    <NewOrder
      :isAddOrder.sync="isAddOrder"
      v-on:order-update="getKanboard"
      v-bind:editorderid="editorderid"
       v-on:clear-add-form="clearAddForm"
    />
    <MessageWarning :msgWarning.sync="msgWarning" v-on:on-continue-warning="continueAction"/>
  </div>
</template>
<script>
import NewOrder from "@/components/NewOrder.vue";
import dashBoardService from "../services/dashboardService";
import MessageWarning from '../components/MessageWarning'
import $ from "jquery";
import Vue from "vue";
export default {
  name: "Dashboard",
  components: {
    NewOrder,MessageWarning
  },
  created() {
    this.getKanboard();
    this.orderStatus = this.orderStatusAll;
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
      msgWarning:'',
      orderdetails: {},
      editorderid: '',
      orderStatusModel:{
        orderId: '',
        OrderStatus: '',
        cancellationReason: '',
      },
      orderStatusAll: [
        { id: 1, value: "New Order" },
        { id: 2, value: "Being Prepared" },
        { id: 3, value: "Prepared" },
        { id: 4, value: "Packing" },
        { id: 5, value: "Ready for Delivery" },
      ],
      orderStatus: [],
    };
  },
  methods: {
    showForm() {
      this.isAddOrder = true;
      //this.editorderid = "";
      console.log('showForm',this.isAddOrder);
    },
    getFilteredStatus(bucketname, order) {
      this.orderStatus = this.orderStatusAll;
      this.orderStatus = this.orderStatus.filter(
        (item) => item.value != bucketname
      );
      if (order.orderType === 1) {
        this.orderStatus = this.orderStatus.filter(
          (item) => item.id != 4 && item.id != 5
        );
      }
      Vue.set(order, "orderStatus", this.orderStatus);
    },
    getKanboard() {
      this.successmsg = "";
      dashBoardService
        .getKanboard()
        .then((response) => {
          this.kanboards = response.data;
          this.beingpreparedorders = response.data.filter(
            (item) => item.bucketName === "Being Prepared"
          )[0];
          if (response.data && response.data.length > 0) {
            this.neworders = response.data.filter(
              (item) => item.bucketName === "New Order"
            )[0];

            this.preparedorders = response.data.filter(
              (item) => item.bucketName === "Prepared"
            )[0];
            this.packingorders = response.data.filter(
              (item) => item.bucketName === "Packing"
            )[0];
            this.readyorders = response.data.filter(
              (item) => item.bucketName === "Ready To Be Delivered"
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
      this.isAddOrder = false;
      dashBoardService
        .getOrderDetails(data.orderId)
        .then((response) => {
          this.orderdetails = response.data;
          Vue.set(data, "orderLines", response.data.orderLines);
        })
        .catch((err) => {
          (this.errormsg = err.messge), console.log(err.message);
        });
    },
    toggleOrderDetails(order, index, dividentifier, bucketname) {
      this.showorderdetails = !this.showorderdetails;
      this.getOrderDetails(order);
      this.getFilteredStatus(bucketname, order);
      $("#orderdetailsdiv" + dividentifier + index).slideToggle();
    },
    editOrder(orderid) {
      this.editorderid = orderid;
      this.isAddOrder = true;
      console.log("editorder", orderid);
    },
    clearAddForm() {
      this.editorderid = '';
       this.isAddOrder = false;
       console.log('clearAddForm',this.isAddOrder);
    },
    showWarning(orderid, statusid, reason){
      this.msgWarning='Are you sure to move this order?';
      this.orderStatusModel.orderId=orderid;
      this.orderStatusModel.orderStatus=statusid;
      this.orderStatusModel.cancellationReason=reason;
    },
    continueAction(){
      console.log('continueAction');
      this.msgWarning='';
         this.changeOrderStatus(this.orderStatusModel.orderId,this.orderStatusModel.orderStatus,this.orderStatusModel.cancellationReason);
    },
    changeOrderStatus(orderid, statusid, reason) {
      var orderStatusModel = {
        orderId: orderid,
        orderStatus: statusid,
        cancellationReason: reason,
      };
      dashBoardService
        .updateOrderStatus(orderStatusModel)
        .then((response) => {
          this.successmsg = "Order Updated.";
          this.getKanboard();
          console.log(response.data);
        })
        .catch((err) => {
          (this.errormsg = err.messge), console.log(err.message);
        });
    },
  },
};
</script>
<style scoped></style>

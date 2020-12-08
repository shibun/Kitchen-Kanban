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
                <span class="order-count">{{ neworders.orderCount }}</span>
              </div>
              <div class="float-right">
                <button class="add-order" @click="showform">+</button>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="ticket-sec">
              <div
                id="ordermaindiv"
                class="ticket-main"
                v-bind:key="index"
                v-for="(order, index) in neworders.orders"
              >
                <div
                  class="order-detail"
                  @click="toggleOrderDetails(order, index)"
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
                  :id="'orderdetailsdiv' + index"
                  class="order-description"
                  style="display:none;"
                >
                  <table class="order-tbl">
                    <tbody>
                      <tr class="order-tbl-header">
                        <td class="text-center">Item Name</td>
                        <td class="text-center">Qty</td>
                        <td class="text-center">Price</td>
                      </tr>
                      <tr
                        v-bind:key="index"
                        v-for="(orderline, index) in orderdetails.orderLines"
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
                            <a href="#">{{ item.value }}</a>
                          </li>
                        </ul>
                      </div>
                      <button
                        @click="editOrder(order)"
                        class="edit-order-btn tkt-left-btn"
                      >
                        Edit Order
                      </button>
                      <button class="cancel-order-btn">Cancel Order</button>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="kb-column">
            <div class="kb-column-header">
              Being Prepared <span class="order-count">03</span>
            </div>
            <div class="ticket-sec">
              <div class="ticket-main">
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
                </div>
              </div>
            </div>
          </div>
          <div class="kb-column">
            <div class="kb-column-header">
              Prepared <span class="order-count">03</span>
            </div>
            <div class="ticket-sec">
              <div class="ticket-main">
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
                </div>
              </div>
            </div>
          </div>
          <div class="kb-column">
            <div class="kb-column-header">
              Packing <span class="order-count">03</span>
            </div>
            <div class="ticket-sec">
              <div class="ticket-main">
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
                </div>
              </div>
            </div>
          </div>
          <div class="kb-column">
            <div class="kb-column-header">
              Ready for Delivery<span class="order-count">03</span>
            </div>
            <div class="ticket-sec">
              <div class="ticket-main">
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
                </div>
                <div class="order-description">
                  <table class="order-tbl">
                    <tbody>
                      <tr class="order-tbl-header">
                        <td class="text-center">Item Name</td>
                        <td class="text-center">Qty</td>
                        <td class="text-center">Price</td>
                      </tr>
                      <tr>
                        <td>Margherita</td>
                        <td class="text-center">01</td>
                        <td class="text-right">$120.00</td>
                      </tr>
                      <tr>
                        <td>Peppy Paneer</td>
                        <td class="text-center">01</td>
                        <td class="text-right">$150.00</td>
                      </tr>
                      <tr>
                        <td>Deluxe Veggie</td>
                        <td class="text-center">01</td>
                        <td class="text-right">$180.00</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <th class="text-center">03</th>
                        <th class="text-right">$120.00</th>
                      </tr>
                    </tbody>
                  </table>
                  <div class="top6">
                    <div class="float-right">
                      <button class="edit-order-btn">Deliver</button>
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
      preparedorders: [],
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
    getKanboard() {
      this.successmsg = "";
      dashBoardService
        .getKanboard()
        .then((response) => {
          this.kanboards = response.data;
          this.neworders = response.data.filter(
            (item) => item.flowOrder === 1
          )[0];
          this.beingpreparedorders = response.data.filter(
            (item) => item.flowOrder === 2
          );
          this.preparedorders = response.data.filter(
            (item) => item.flowOrder === 3
          );
          this.packingorders = response.data.filter(
            (item) => item.flowOrder === 4
          );
          this.readyorders = response.data.filter(
            (item) => item.flowOrder === 5
          );
          console.log(this.neworders);
        })
        .catch((err) => {
          (this.errormsg = err.messge), console.log(err.message);
        });
    },
    getOrderDetails(id) {
      dashBoardService
        .getOrderDetails(id)
        .then((response) => {
          this.orderdetails = response.data;
          console.log(response.data);
        })
        .catch((err) => {
          (this.errormsg = err.messge), console.log(err.message);
        });
    },
    toggleOrderDetails(order, index) {
      this.showorderdetails = !this.showorderdetails;
      this.getOrderDetails(order.orderId);
      $("#orderdetailsdiv" + index).slideToggle();
    },
    editOrder(data) {
      this.editorder = data;
      console.log("editorder", data);
    },
  },
};
</script>
<style scoped></style>

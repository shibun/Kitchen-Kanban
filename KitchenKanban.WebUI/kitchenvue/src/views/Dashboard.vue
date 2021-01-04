<template>
  <div>
    <section>
      <div class="breadcrumb">
        <div>Dashboard</div>
        <div class="current-time">{{currentdate |formatTime}}</div>
        <div class="clearfix"></div>
      </div>
      <div class="kanban-sec">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xs-9"></div>
            <div class="col-xs-3">
              <input
                type="search"
                placeholder="Search Order"
                class="form-control" v-model="search"
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
                    <div class="float-left"><img src="../assets/images/order_number_icon.png"/> {{ order.orderNumber.split("-")[1] }}</div>
                    <div class="float-right"><img src="../assets/images/time_icon.png"/> {{getordertime(order.orderDate) |toFixed}}</div>                    
                    <div class="clearfix"></div>
                  </div>
                  
                </div>
                <div
                  :id="'orderdetailsdivno' + index"
                  class="order-description"
                  v-if="order.orderLines"
                >
                  <table class="order-tbl" >
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
                        <td class="text-right">{{ orderline.itemCharge * orderline.orderQuantity |toFixed|toUSD}}</td>
                      </tr>
                        <tr>
                           <th>Total</th>
                            <th class="text-center">{{order.noOfItemsInOrder}}</th>
                            <th class="text-right">{{order.orderAmount |toFixed|toUSD}}</th>
                         </tr>
                    </tbody>
                  </table>
                  <div class="top6">
                    <div class="float-right">                      
                      <button
                        @click="editOrder(order.orderId)"
                        class="edit-order-btn tkt-left-btn"
                      >
                        Edit Order
                      </button>
                      <button
                        class="cancel-order-btn tkt-left-btn"
                        @click="showWarningCancel(order.orderId, 7, 'Incorrect order')">
                        Cancel Order
                      </button>
                      <div class="dropup">
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
                (beingpreparedorders && beingpreparedorders.orderCount) || 0
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
                    <div class="float-left"><img src="../assets/images/order_number_icon.png"/> {{ bporder.orderNumber.split("-")[1] }}</div>
                    <div class="float-right"><img src="../assets/images/time_icon.png"/> {{getordertime(bporder.orderDate) |toFixed}}</div>
                    <div class="clearfix"></div>
                  </div>                  
                </div>
                <div
                  :id="'orderdetailsdivbp' + bpindex"
                  class="order-description"
                 v-if="bporder.orderLines"
                >
                  <table class="order-tbl" >
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
                           <td class="text-right">{{ orderline.itemCharge * orderline.orderQuantity |toFixed|toUSD}}</td>
                      </tr>
                        <tr>
                           <th>Total</th>
                            <th class="text-center">{{bporder.noOfItemsInOrder}}</th>
                            <th class="text-right">{{bporder.orderAmount |toFixed|toUSD}}</th>
                         </tr>
                    </tbody>
                  </table>
                  <div class="top6">
                    <div class="float-right">
                      <div class="dropup">
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
                                 showWarning(bporder.orderId, item.id, '')
                              "
                              >{{ item.value }}</a
                            >
                          </li>
                        </ul>
                      </div>

                     <!-- <button
                        class="cancel-order-btn"
                        @click="
                          showWarningCancel(
                            bporder.orderId,
                            7,
                            'Incorrect order'
                          )
                        "
                      >
                        Cancel Order
                      </button>-->
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
                    <div class="float-left"><img src="../assets/images/order_number_icon.png"/> {{ order.orderNumber.split("-")[1] }}</div>
                    <div class="float-right"><img src="../assets/images/time_icon.png"/> {{getordertime(order.orderDate) |toFixed}}</div>
                    <div class="clearfix"></div>
                  </div>                  
                </div>
                <div
                  :id="'orderdetailsdivpo' + index"
                  class="order-description"
                  v-if="order.orderLines"
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
                        v-for="(orderline, index) in order.orderLines"
                      >
                        <td>{{ orderline.itemName }}</td>
                        <td class="text-center">
                          {{ orderline.orderQuantity }}
                        </td>
                           <td class="text-right">{{ orderline.itemCharge * orderline.orderQuantity |toFixed|toUSD}}</td>
                      </tr>
                        <tr>
                           <th>Total</th>
                            <th class="text-center">{{order.noOfItemsInOrder}}</th>
                            <th class="text-right">{{order.orderAmount |toFixed|toUSD}}</th>
                         </tr>
                    </tbody>
                  </table>
                  <div class="top6">
                    <div class="float-right">
                      <div class="dropup">
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
                          showWarningCancel(order.orderId, 7, 'Incorrect order')
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
                    <div class="float-left"><img src="../assets/images/order_number_icon.png"/> {{ order.orderNumber.split("-")[1] }}</div>
                    <div class="float-right"><img src="../assets/images/time_icon.png"/> {{getordertime(order.orderDate) |toFixed}}</div>
                    <div class="clearfix"></div>
                  </div>
                </div>
                <div   :id="'orderdetailsdivko' + index" class="order-description" v-if="order.orderLines" >
                  <table class="order-tbl" >
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
                          <td class="text-right">{{ orderline.itemCharge * orderline.orderQuantity |toFixed|toUSD}}</td>
                      </tr>
                        <tr>
                           <th>Total</th>
                            <th class="text-center">{{order.noOfItemsInOrder}}</th>
                            <th class="text-right">{{order.orderAmount |toFixed|toUSD}}</th>
                         </tr>
                    </tbody>
                  </table>
                  <div class="top6">
                    <div class="float-right">
                      <div class="dropup">
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
                          showWarningCancel(order.orderId, 7, 'Incorrect order')
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
              <div class="ticket-main" v-bind:class="{ 'delivered-tkt' : order.orderStatus==6  }"  id="ordermaindivro"  v-bind:key="index" v-for="(order, index) in readyorders.orders">
                <div   class="order-detail"
                  @click="
                    toggleOrderDetails(
                      order,
                      index,
                      'ro',
                      readyorders.bucketName
                    )  " >
                  <div>
                    <div class="float-left"><img src="../assets/images/order_number_icon.png"/> {{ order.orderNumber.split("-")[1] }}</div>                   
                    <div class="float-right"><img src="../assets/images/time_icon.png"/> {{getordertime(order.orderDate) |toFixed}}</div>                     
                    <div class="clearfix"></div>
                  </div>  
                  <div class="delivered-status" v-if="order.orderStatus==6">Delivered</div>                
                </div>
                <div :id="'orderdetailsdivro' + index" class="order-description"  v-if="order.orderLines">
                  <table class="order-tbl">
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
                          <td class="text-right">{{ orderline.itemCharge * orderline.orderQuantity |toFixed|toUSD}}</td>
                      </tr>
                        <tr>
                           <th>Total</th>
                            <th class="text-center">{{order.noOfItemsInOrder}}</th>
                            <th class="text-right">{{order.orderAmount |toFixed|toUSD}}</th>
                         </tr>
                    </tbody>
                  </table>
                  <div class="top6" >
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
              <div v-if="deliveredorders">
              
                  <div class="ticket-main delivered-tkt" v-bind:key="index" v-for="(order, index) in deliveredorders.orders">
                      <div class="order-detail"
                           @click="
                    toggleOrderDetails(
                      order,
                      index,
                      'ro',
                      deliveredorders.bucketName
                    )  ">
                          <div>
                              <div class="float-left"><img src="../assets/images/order_number_icon.png" /> {{ order.orderNumber.split("-")[1] }}</div>
                              <div class="float-right"><img src="../assets/images/time_icon.png" /> {{getordertime(order.orderDate) |toFixed}}</div>
                               
                              <div class="clearfix"></div>
                          </div>
                      </div>
                      <div :id="'orderdetailsdivro' + index" class="order-description" style="display:none;">
                          <table class="order-tbl" v-if="order.orderLines">
                              <tbody>
                                  <tr class="order-tbl-header">
                                      <td class="text-center">Item Name</td>
                                      <td class="text-center">Qty</td>
                                      <td class="text-center">Price</td>
                                  </tr>
                                  <tr v-bind:key="index"
                                      v-for="(orderline, index) in order.orderLines">
                                      <td>{{ orderline.itemName }}</td>
                                      <td class="text-center">
                                          {{ orderline.orderQuantity }}
                                      </td>
                                      <td class="text-right">{{ orderline.itemCharge * orderline.orderQuantity |toFixed|toUSD}}</td>
                                  </tr>
                                  <tr>
                                      <th>Total</th>
                                      <th class="text-center">{{order.noOfItemsInOrder}}</th>
                                      <th class="text-right">{{order.orderAmount |toFixed|toUSD}}</th>
                                  </tr>
                              </tbody>
                          </table>
                          <div class="delivered-status">Delivered</div>
                      </div>


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
   <MessageWarning :msgWarning.sync="msgWarning" :hideCheck="hideCheck" v-on:on-continue-warning="continueAction"/>
   <MessageError :msg="errormsg" v-on:on-error="onError" />
  </div>
</template>
<script src='../viewscripts/dashboardScript.js' type="text/javascript" >

</script>
<style scoped></style>

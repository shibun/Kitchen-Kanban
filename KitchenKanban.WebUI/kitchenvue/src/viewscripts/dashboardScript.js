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
      hideCheck:true,
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
    showWarningCancel(orderid, statusid, reason){
        this.hideCheck=true;
        this.msgWarning='Are you sure to cancel this order?';

        this.orderStatusModel.orderId=orderid;
        this.orderStatusModel.orderStatus=statusid;
        this.orderStatusModel.cancellationReason=reason;
    },
    showWarning(orderid, statusid, reason){
        console.log('localstorage',localStorage.getItem('kitchenvuewarning') || true)
        var showWarningCheck=localStorage.getItem('kitchenvuewarning') || true;

        if(showWarningCheck===true){
            this.hideCheck=false;
            this.msgWarning='Are you sure to move this order?';
            this.orderStatusModel.orderId=orderid;
            this.orderStatusModel.orderStatus=statusid;
            this.orderStatusModel.cancellationReason=reason;
        }
        else{
            this.msgWarning=''
            this.changeOrderStatus(orderid,statusid,reason);
        }
      
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
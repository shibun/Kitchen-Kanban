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
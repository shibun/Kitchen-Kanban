import React from "react";
import { connect } from "react-redux";
import {orderActions  } from "../_actions";

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       currentdate: "",
       filtereditems:[],
       totalitemamount:0.0,
       totalitemcount:0,
       totalqty:0,
       totalamount:0.0,
       query:''
    };
    this.getNow = this.getNow.bind(this);
    this.getOrderById=this.getOrderById.bind(this);
    this.handleChange=this.handleChange.bind(this);
    
  }
  componentDidMount() {
    this.props.getAllOrders();
  this.getNow();
  }

  getNow = function () {
    const today = new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" +today.getDate();
    const time =today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;
    this.setState({
      currentdate: dateTime,
    });
  };
  getOrderById=function(orderId){
      this.props.getOrderById(orderId).then(()=>{
           this.state.totalitemcount = 0;
              this.state.totalitemamount=0.0;
                this.props.getorder.item.orderLines.map((value, index) => {
                    this.state.totalitemamount = this.state.totalitemamount + (parseFloat(value.itemCharge)*(value.orderQuantity));
                    this.state.totalitemcount = parseInt(this.state.totalitemcount) + parseInt(value.orderQuantity);
                }); 
                this.setState({
                    totalitemamount:this.state.totalitemamount,
                    totalitemcount:this.state.totalitemcount
                })
      });
  }
  handleChange(e){
         const { name, value } = e.target;      
         const { query } = this.state;
         this.setState({
            query: e.target.value
        });
     
    
      
           
  }
  componentDidUpdate(prevProps){
     if(this.props.orders.items!=prevProps.orders.items)
      {
         this.setState({
             filtereditems:this.props.orders.items
         })
            this.state.totalamount=0.0;
             this.state.totalqty = 0;
                this.props.orders.items.map((value, index) => {
                    this.state.totalamount = this.state.totalamount + parseFloat(value.orderAmount);
                    this.state.totalqty = parseInt(this.state.totalqty) + parseInt(value.noOfItemsInOrder);
                });  
                 this.setState({
                    totalamount:this.state.totalamount,
                    totalqty:this.state.totalqty
                })  
      }
      
  }
 
  




  render() {
    const {orders,getorder} = this.props;
    let { filtereditems,totalitemcount,totalitemamount,totalamount,totalqty,query} = this.state;  
    if(filtereditems.length>0){       
    const stringfilter = query.toString();
     filtereditems = orders.items.filter(order => {
      return order.orderNumber.includes(stringfilter)
    });
    }
    return (
      <div>
       <div>
        <section>
            <div className="breadcrumb">
                <div>Reports</div>
                 <div className="current-time">{this.state.currentdate}</div>
                   <div className="clearfix"></div>
            </div>
            <div className="list-sec">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-9">
                            &nbsp;
                        </div>
                     
                        <div className="col-xs-3">
                            <input type="search" placeholder="Search Order"  name="query" className="form-control" value={query} onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
                <table className="custom-tbl">
                <tbody>
                    <tr>
                        <th className="text-center">Sl No</th>
                        <th className="text-center">Order No</th>
                        <th className="text-center">Order Time</th>
                        <th className="text-center">No of Dishes</th>
                        <th className="text-center">Order Taken By</th>
                        <th className="text-center">Order Value</th>
                        <th className="text-center">Order Status</th>
                        <th className="text-center">Detail</th>
                    </tr>
                       {filtereditems && filtereditems.map((order, index) =>                                         
                                                    
                        <tr key={order.orderId}>
                        <td className="text-center">{index+1}</td>
                        <td>{order.orderNumber}</td>
                        <td>{order.orderDate }</td>
                        <td className="text-center">{order.noOfItemsInOrder}</td>
                        <td>{order.orderTakenByUserName}</td>
                        <td className="text-right">{order.orderAmount  }</td>
                        <td className="text-center">
                        { order.orderStatus==1 && <span >NewOrder</span>}
                        {order.orderStatus==2 &&  <span>BeingPrepared</span>}
                       {order.orderStatus==3 &&  <span >Prepared</span>}
                       {order.orderStatus==4 &&  <span >Packing</span>}
                       {order.orderStatus==5 &&  <span >ReadyToBeDelivered</span>}
                       {order.orderStatus==6 &&  <span >Completed</span>}  
                        {order.orderStatus==7 &&  <span   className="cancelled-order-status">Cancelled</span>}  
                        </td>
                        <td className="text-center">
                            <button className="trans-btn" data-toggle="modal" data-target="#reportDetail" onClick={()=>{this.getOrderById(order.orderId)}}><i className="glyphicon glyphicon-exclamation-sign"></i></button>
                        </td>

                        </tr>
                       )
                       }
                    <tr className="custom-btl-row">
                        <td colSpan="3">&nbsp;</td>
                        <td className="text-center bold">{totalqty}</td>
                        <td className="text-right bold">Total</td>
                        <td className="text-right bold">{totalamount }</td>
                        <td colSpan="2">&nbsp;</td>
                    </tr>
                    </tbody>
                   
                
                    
                </table>
            </div>
        </section>
        <div className="clearfix"></div>
        </div>


        <div id="reportDetail" className="modal fade" role="dialog">
        {getorder.item &&
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">{getorder.item.order.orderNumber}</h4>
                </div>
                <div className="modal-body">
                    <table className="report-tbl">
                    <tbody>
                    <tr>
                            <th>Status</th>
                            <td>
                            {getorder.item.order.orderStatus==1 && <span >NewOrder</span>}
                        {getorder.item.order.orderStatus==2 &&  <span>BeingPrepared</span>}
                       {getorder.item.order.orderStatus==3 &&  <span >Prepared</span>}
                       {getorder.item.order.orderStatus==4 &&  <span >Packing</span>}
                       {getorder.item.order.orderStatus==5 &&  <span >ReadyToBeDelivered</span>}
                       {getorder.item.order.orderStatus==6 &&  <span >Completed</span>}  
                        {getorder.item.order.orderStatus==7 &&  <span   className="cancelled-order-status">Cancelled</span>}  
   
                            </td>
                            <th>Ordered Date</th>
                            <td>{getorder.item.order.orderDate }</td>
                        </tr>
                             <tr>
                            <th>Ordered Time</th>
                            <td>{getorder.item.order.orderDate}</td>
                            <th>Delivered Time</th>
                            <td>
                            <span >{getorder.item.order.orderDeliveryDate}</span></td>
                        </tr>
                        <tr>
                            <th>Ordered Taken By</th>
                            <td>{getorder.item.order.orderTakenByUserName}</td> 
                            <th>Customer Phone No</th>
                            <td>{getorder.item.order.customerContactNumber?getorder.item.order.customerContactNumber.substring(0,4)+"*****":''}</td> 
                        </tr>                       
                        <tr>
                            <th>Customer Name</th>
                            <td>{getorder.item.order.customerName?getorder.item.order.customerName.substring(0,3)+"*****":''}</td>
                           
                        </tr>
                        </tbody>
                    </table>

                    <h5 className="order-dtls">Order Details</h5>
                    <table className="custom-tbl">
                    <tbody>
                        <tr>
                            <th className="text-center"></th>
                            <th className="text-center">Item Name</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Price</th>
                        </tr>
                   
                     { getorder.item.orderLines &&  getorder.item.orderLines.map((data,index)=>
                     <tr key={data.itemId}>
                      <td className="text-center">{index+1}</td>
                            <td>{data.itemName}</td>
                            <td className="text-center">{data.orderQuantity}</td>
                            <td className="text-right">{(data.orderQuantity)*(data.itemCharge)}</td>
                        </tr>)                      
                     }
                      <tr>
                            <td className="bold ">&nbsp;</td>
                            <td className="bold">&nbsp;</td>
                            <td className="bold text-center">{totalitemcount}</td>
                            <td className="bold text-right">{totalitemamount} </td>
                        </tr>
                      
                       
                        </tbody>                   
                    </table>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>}
    </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  const { orders ,getorder} = state;
  return { orders ,getorder};
}
const actionCreators = {
  
 getAllOrders: orderActions.getAllOrders,
 getOrderById:orderActions.getOrderById

}

const connectedReports = connect(mapStateToProps,actionCreators)(Reports);
export { connectedReports as Reports };

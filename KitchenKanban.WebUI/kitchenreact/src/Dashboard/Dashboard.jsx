import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { dashboardActions } from '../_actions';
import { dashboardService } from '../_services';

import { Header } from '../_components/Header';
import{NewOrder} from '../_components/NewOrder';
import moment from 'moment';

class DashboardPage extends React.Component {
 constructor(props) {
        super(props); 
        this._isMounted = false;
        this.state={
            currentdate:moment(new Date()).format("DD/MM/YYYY hh:mm a"),
            showform:false, 
            ordertobeedited:{},         
            neworders: [],
            beingpreparedorders: [],
            preparedorders: [],
            packingorders: [],
            readyorders: [],
            deliveredorders:[],

            orderStatusAll: [
              { id: 1, value: "New Order" },
              { id: 2, value: "Being Prepared" },
              { id: 3, value: "Prepared" },
              { id: 4, value: "Packing" },
              { id: 5, value: "Ready for Delivery" },
            ],
            orderStatus: [],
        };
        this.handleOnAddClick=this.handleOnAddClick.bind(this);  
        this.toggleOrderDetails=this.toggleOrderDetails.bind(this);
        this.showWarning=this.showWarning.bind(this);
        this.changeOrderStatus=this.changeOrderStatus.bind(this);
        this.showWarningCancel=this.showWarningCancel.bind(this);
        this.editOrder=this.editOrder.bind(this);
        //this.changeOrderStatus=this.changeOrderStatus.bind(this);
    
    
      }
   
  componentDidMount () {   
    this._isMounted = true;
    this._isMounted && this.props.getKanboard();
    }

    componentWillUnmount() {
      this._isMounted = false;
   }

  handleOnAddClick(){
        this.setState({
            showform:true,
            ordertobeedited:{}      
        });        
    }  
  handler = (val) => {
    this.setState({
      showform: val
    })
  } 

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.kanbanorders !== this.props.kanbanorders) {
      console.log('list received');
      if(nextProps.kanbanorders && nextProps.kanbanorders.items){
          const neworders = nextProps.kanbanorders.items.filter((item) => item.bucketName === "New Order" )[0].orders;
          const beingpreparedorders = nextProps.kanbanorders.items.filter((item) => item.bucketName === "Being Prepared" )[0].orders;
          const preparedorders = nextProps.kanbanorders.items.filter((item) => item.bucketName === "Prepared" )[0].orders;
          const packingorders = nextProps.kanbanorders.items.filter((item) => item.bucketName === "Packing" )[0].orders;
          const readyorders = nextProps.kanbanorders.items.filter((item) => item.bucketName ===  "Ready To Be Delivered" ||item.bucketName === "Takeaway"  )[0].orders;
          console.log('neworders',neworders);
          this.setState({
            neworders: neworders,
            beingpreparedorders: beingpreparedorders,
            preparedorders: preparedorders,
            packingorders: packingorders,
            readyorders: readyorders

          })
      }
    }

    // if (nextProps.orderdetails !== this.props.orderdetails) {

    //   this.setState({
    //     neworders: {
    //        ...this.state.neworders,
    //        ['idea']: 'something'
    //     }
    //   });

    //    console.log('order details set',this.state.neworders);
    // }
  }

  getordertime(orderdate){
      var initial = new Date(orderdate);
      var final = new Date();  
      var difference = (Math.floor(final.getTime()-initial.getTime())/36e6);  
    return difference.toFixed(2);
    //return moment(String(difference)).format('hh:mm a')
   }

  toggleOrderDetails(order, index, dividentifier, bucketname) {   
    if(order.orderStatus==6){
      return
    }
    else{
       $("#orderdetailsdiv" + dividentifier + index).slideToggle();
       this.showorderdetails = !this.showorderdetails;
       console.log('toggleOrderDetails',order);
       this.getOrderDetails(order,bucketname);
       //this.getFilteredStatus(bucketname, order);
       
      }
  }
  getOrderDetails(data,bucketname) {
    this.isAddOrder = false;
    dashboardService.getOrderDetails(data.orderId)
      .then((response) => {

        //data.orderLines= response.data.orderLines
        var newitems= this.state[bucketname].map(item =>
          item.orderId === response.data.order.orderId
            ? { ...item, orderLines: response.data.orderLines }
            : item
        )

        this.setState({
          [bucketname]:newitems
          //neworders:newitems
        })
      })
      .catch((err) => {
        (this.errormsg = err.messge), console.log(err.message);
      });
  }

  showWarning(orderid, statusid, reason){
    this.changeOrderStatus(orderid,statusid,reason);
  }


  changeOrderStatus(orderid, statusid, reason) {     
    var orderStatusModel = {
      orderId: orderid,
      orderStatus: statusid,
      cancellationReason: reason,       
    };
 
    dashboardService
      .updateOrderStatus(orderStatusModel)
      .then((response) => {          
        this.props.getKanboard();
        console.log(response.data);
      })
      .catch((error) => {
        (this.errormsg = error.data), console.log(error.data);
      });
  }

  showWarningCancel(orderid, statusid, reason){
    this.changeOrderStatus(orderid,statusid,reason);
}

editOrder(order) {
  // this.ordertobeedited = orderid;
  // this.isAddOrder = true;
  this.setState({
    showform:true,
    ordertobeedited:order
  })
  //console.log("editorder", orderid);
}

    render() {
      const { kanbanorders,orderdetails } = this.props;
      const {neworders,beingpreparedorders,preparedorders,packingorders,readyorders,deliveredorders,showform,currentdate,ordertobeedited}=this.state;
        return (
          <div>

    <section>

    <div className="breadcrumb">
        <div>Dashboard</div>
        <div className="current-time">{currentdate} </div>
        <div className="clearfix"></div>
      </div>
 
     <div className="kanban-sec">
      <div className="container-fluid">
          <div className="row">
            <div className="col-xs-9"></div>
            <div className="col-xs-3">
              <input
                type="search"
                placeholder="Search Order"
                className="form-control" 
              />
            </div>
          </div>
        </div>
      <div className="kb-main">

 {/* kb colum start  New Order*/}
      <div className="kb-column">
            <div className="kb-column-header">
              <div className="float-left">
                New Order
                <span className="order-count">{
                  (neworders && neworders.length) || 0
                }</span>
              </div>
              <div className="float-right">
                <button className="add-order" onClick={this.handleOnAddClick}>+</button>
              </div>
              <div className="clearfix"></div>
            </div>
  {neworders &&
            <div className="ticket-sec">
      {neworders && neworders.map((order, index) => (
              <div id="ordermaindivno" className="ticket-main" key={index}>
                <div className="order-detail" onClick={e=>this.toggleOrderDetails(order, index, 'no', 'neworders')}>
                  <div>
                    <div className="float-left"><img src="../../src/_assets/images/order_number_icon.png"/> { order.orderNumber.split("-")[1]}</div>
                    <div className="float-right"><img src="../../src/_assets/images/time_icon.png"/>{this.getordertime(order.orderDate)}</div>                    
                    <div className="clearfix"></div>
                  </div>
                  
                </div>
            {order && order.orderLines &&
                <div id={"orderdetailsdivno"+index} className="order-description">
                  <table className="order-tbl" >
                    <tbody>
                      <tr className="order-tbl-header">
                        <td className="text-center">Item Name</td>
                        <td className="text-center">Qty</td>
                        <td className="text-center">Price</td>
                      </tr>
                        {order.orderLines && order.orderLines.map((orderline, index) => (
                            <tr key={index}>
                              <td>{ orderline.itemName }</td>
                              <td className="text-center">
                                { orderline.orderQuantity }
                              </td>
                              <td className="text-right">${ orderline.itemCharge * orderline.orderQuantity}</td>
                            </tr>
                        ))}
                        <tr>
                           <th>Total</th>
                            <th className="text-center">{order.orderLineCount}</th>
                            <th className="text-right">${order.orderAmount}</th>
                         </tr>
                    </tbody>
                  </table>

                  <div className="top6">
                    <div className="float-right">
                      <div className="dropup tkt-left-btn">
                        <button
                          className="move-order-btn dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                        >
                          Move To
                          <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" v-if="order.orderStatus">
                          {this.state.orderStatusAll && this.state.orderStatusAll.map((item, index) => (
                          <li value={item.id}  key={item.id}>
                            <a
                              href="#" onClick={e=>this.showWarning(order.orderId, item.id, '')}>{ item.value }</a
                            >
                          </li>
                          ))}
                        </ul>
                      </div>
                      <button onClick={e=>this.editOrder(order)} className="edit-order-btn tkt-left-btn">
                      Edit Order
                    </button>
                    <button className="cancel-order-btn" onClick={e=>this.showWarningCancel(order.orderId, 7, 'Incorrect order')}>
                      Cancel Order
                    </button>
                 
                    </div>
                    <div className="clearfix"></div>
                  </div>

                </div>
              }
              </div>
            ))} 

            </div>
      }
          </div>
      
      {/* kb colum end */}

      {/* kb colum start  Being Prepared*/}
      <div className="kb-column">
            <div className="kb-column-header">
              <div className="float-left">
              Being Prepared
                <span className="order-count">{
                  (beingpreparedorders && beingpreparedorders.length) || 0
                }</span>
              </div>
            
              <div className="clearfix"></div>
            </div>
  {beingpreparedorders &&
            <div className="ticket-sec">
      {beingpreparedorders && beingpreparedorders.map((order, index) => (
              <div id="ordermaindivbp" className="ticket-main" key={index}>
                <div className="order-detail" onClick={e=>this.toggleOrderDetails(order, index, 'bp', 'beingpreparedorders')}>
                  <div>
                    <div className="float-left"><img src="../../src/_assets/images/order_number_icon.png"/> { order.orderNumber.split("-")[1]}</div>
                    <div className="float-right"><img src="../../src/_assets/images/time_icon.png"/>{this.getordertime(order.orderDate)}</div>                    
                    <div className="clearfix"></div>
                  </div>
                  
                </div>
            {order && order.orderLines &&
                <div id={"orderdetailsdivbp"+index} className="order-description">
                  <table className="order-tbl" >
                    <tbody>
                      <tr className="order-tbl-header">
                        <td className="text-center">Item Name</td>
                        <td className="text-center">Qty</td>
                        <td className="text-center">Price</td>
                      </tr>
                        {order.orderLines && order.orderLines.map((orderline, index) => (
                            <tr key={index}>
                              <td>{ orderline.itemName }</td>
                              <td className="text-center">
                                { orderline.orderQuantity }
                              </td>
                              <td className="text-right">${ orderline.itemCharge * orderline.orderQuantity}</td>
                            </tr>
                        ))}
                        <tr>
                           <th>Total</th>
                            <th className="text-center">{order.orderLineCount}</th>
                            <th className="text-right">${order.orderAmount}</th>
                         </tr>
                    </tbody>
                  </table>

                  <div className="top6">
                    <div className="float-right">
                      <div className="dropup tkt-left-btn">
                        <button
                          className="move-order-btn dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                        >
                          Move To
                          <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" v-if="order.orderStatus">
                          {this.state.orderStatusAll && this.state.orderStatusAll.map((item, index) => (
                          <li value={item.id}  key={item.id}>
                            <a
                              href="#" onClick={e=>this.showWarning(order.orderId, item.id, '')}>{ item.value }</a
                            >
                          </li>
                          ))}
                        </ul>
                      </div>
                     
                    </div>
                    <div className="clearfix"></div>
                  </div>

                </div>
              }
              </div>
            ))} 

            </div>
      }
          </div>
      
      {/* kb colum end */}

      {/* kb colum start  Prepared*/}
      <div className="kb-column">
            <div className="kb-column-header">
              <div className="float-left">
               Prepared
                <span className="order-count">{
                  (preparedorders && preparedorders.length) || 0
                }</span>
              </div>
            
              <div className="clearfix"></div>
            </div>
  {preparedorders &&
            <div className="ticket-sec">
      {preparedorders && preparedorders.map((order, index) => (
              <div id="ordermaindivpo" className="ticket-main" key={index}>
                <div className="order-detail" onClick={e=>this.toggleOrderDetails(order, index, 'po', 'preparedorders')}>
                  <div>
                    <div className="float-left"><img src="../../src/_assets/images/order_number_icon.png"/> { order.orderNumber.split("-")[1]}</div>
                    <div className="float-right"><img src="../../src/_assets/images/time_icon.png"/>{this.getordertime(order.orderDate)}</div>                    
                    <div className="clearfix"></div>
                  </div>
                  
                </div>
            {order && order.orderLines &&
                <div id={"orderdetailsdivpo"+index} className="order-description">
                  <table className="order-tbl" >
                    <tbody>
                      <tr className="order-tbl-header">
                        <td className="text-center">Item Name</td>
                        <td className="text-center">Qty</td>
                        <td className="text-center">Price</td>
                      </tr>
                        {order.orderLines && order.orderLines.map((orderline, index) => (
                            <tr key={index}>
                              <td>{ orderline.itemName }</td>
                              <td className="text-center">
                                { orderline.orderQuantity }
                              </td>
                              <td className="text-right">${ orderline.itemCharge * orderline.orderQuantity}</td>
                            </tr>
                        ))}
                        <tr>
                           <th>Total</th>
                            <th className="text-center">{order.orderLineCount}</th>
                            <th className="text-right">${order.orderAmount}</th>
                         </tr>
                    </tbody>
                  </table>

                  <div className="top6">
                    <div className="float-right">
                      <div className="dropup tkt-left-btn">
                        <button
                          className="move-order-btn dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                        >
                          Move To
                          <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" v-if="order.orderStatus">
                          {this.state.orderStatusAll && this.state.orderStatusAll.map((item, index) => (
                          <li value={item.id}  key={item.id}>
                            <a
                              href="#" onClick={e=>this.showWarning(order.orderId, item.id, '')}>{ item.value }</a
                            >
                          </li>
                          ))}
                        </ul>
                      </div>
                     
                    </div>
                    <div className="clearfix"></div>
                  </div>

                </div>
              }
              </div>
            ))} 

            </div>
      }
          </div>
      
      {/* kb colum end */}

       {/* kb colum start  Packing*/}
       <div className="kb-column">
            <div className="kb-column-header">
              <div className="float-left">
               Packing
                <span className="order-count">{
                  (packingorders && packingorders.length) || 0
                }</span>
              </div>
            
              <div className="clearfix"></div>
            </div>
  {packingorders &&
            <div className="ticket-sec">
      {packingorders && packingorders.map((order, index) => (
              <div id="ordermaindivko" className="ticket-main" key={index}>
                <div className="order-detail" onClick={e=>this.toggleOrderDetails(order, index, 'ko', 'packingorders')}>
                  <div>
                    <div className="float-left"><img src="../../src/_assets/images/order_number_icon.png"/> { order.orderNumber.split("-")[1]}</div>
                    <div className="float-right"><img src="../../src/_assets/images/time_icon.png"/>{this.getordertime(order.orderDate)}</div>                    
                    <div className="clearfix"></div>
                  </div>
                  
                </div>
            {order && order.orderLines &&
                <div id={"orderdetailsdivko"+index} className="order-description">
                  <table className="order-tbl" >
                    <tbody>
                      <tr className="order-tbl-header">
                        <td className="text-center">Item Name</td>
                        <td className="text-center">Qty</td>
                        <td className="text-center">Price</td>
                      </tr>
                        {order.orderLines && order.orderLines.map((orderline, index) => (
                            <tr key={index}>
                              <td>{ orderline.itemName }</td>
                              <td className="text-center">
                                { orderline.orderQuantity }
                              </td>
                              <td className="text-right">${ orderline.itemCharge * orderline.orderQuantity}</td>
                            </tr>
                        ))}
                        <tr>
                           <th>Total</th>
                            <th className="text-center">{order.orderLineCount}</th>
                            <th className="text-right">${order.orderAmount}</th>
                         </tr>
                    </tbody>
                  </table>

                  <div className="top6">
                    <div className="float-right">
                      <div className="dropup tkt-left-btn">
                        <button
                          className="move-order-btn dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                        >
                          Move To
                          <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" v-if="order.orderStatus">
                          {this.state.orderStatusAll && this.state.orderStatusAll.map((item, index) => (
                          <li value={item.id}  key={item.id}>
                            <a
                              href="#" onClick={e=>this.showWarning(order.orderId, item.id, '')}>{ item.value }</a
                            >
                          </li>
                          ))}
                        </ul>
                      </div>
                     
                    </div>
                    <div className="clearfix"></div>
                  </div>

                </div>
              }
              </div>
            ))} 

            </div>
      }
          </div>
      
      {/* kb colum end */}

       {/* kb colum start  Packing*/}
       <div className="kb-column">
            <div className="kb-column-header">
              <div className="float-left">
              Ready for Delivery
                <span className="order-count">{
                  (readyorders && readyorders.length) || 0
                }</span>
              </div>
            
              <div className="clearfix"></div>
            </div>
  {readyorders &&
            <div className="ticket-sec">
      {readyorders && readyorders.map((order, index) => (
              <div id="ordermaindivro" className="ticket-main" key={index}>
                <div className="order-detail" onClick={e=>this.toggleOrderDetails(order, index, 'ro', 'readyorders')}>
                  <div>
                    <div className="float-left"><img src="../../src/_assets/images/order_number_icon.png"/> { order.orderNumber.split("-")[1]}</div>
                    <div className="float-right"><img src="../../src/_assets/images/time_icon.png"/>{this.getordertime(order.orderDate)}</div>                    
                    <div className="clearfix"></div>
                  </div>
                  {order.orderStatus==6 &&
                  <div class="delivered-status">Delivered</div>  
                  }
                </div>
            {order && order.orderLines &&
                <div id={"orderdetailsdivro"+index} className="order-description">
                  <table className="order-tbl" >
                    <tbody>
                      <tr className="order-tbl-header">
                        <td className="text-center">Item Name</td>
                        <td className="text-center">Qty</td>
                        <td className="text-center">Price</td>
                      </tr>
                        {order.orderLines && order.orderLines.map((orderline, index) => (
                            <tr key={index}>
                              <td>{ orderline.itemName }</td>
                              <td className="text-center">
                                { orderline.orderQuantity }
                              </td>
                              <td className="text-right">${ orderline.itemCharge * orderline.orderQuantity}</td>
                            </tr>
                        ))}
                        <tr>
                           <th>Total</th>
                            <th className="text-center">{order.orderLineCount}</th>
                            <th className="text-right">${order.orderAmount}</th>
                         </tr>
                    </tbody>
                  </table>

                  <div className="top6">
                    <div className="float-right">
                      <div className="dropup tkt-left-btn">
                        <button
                          className="move-order-btn dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                        >
                          Move To
                          <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" v-if="order.orderStatus">
                          {this.state.orderStatusAll && this.state.orderStatusAll.map((item, index) => (
                          <li value={item.id}  key={item.id}>
                            <a
                              href="#" onClick={e=>this.showWarning(order.orderId, item.id, '')}>{ item.value }</a
                            >
                          </li>
                          ))}
                        </ul>
                      </div>
                      <button
                      className="edit-order-btn"
                        onClick={e=>this.changeOrderStatus(order.orderId, 6, '')}
                      >
                        Deliver
                      </button>
                    </div>
                    <div className="clearfix"></div>
                  </div>

                </div>
              }
              </div>
            ))} 

            </div>
      }
          </div>
      
      {/* kb colum end */}
      </div>
      </div>
         </section>
         {this.state.showform && <div className ="tkt-desc"><NewOrder   handler = {this.handler} showorderform={this.state.showform} ordertobeedited={ordertobeedited}></NewOrder></div>}
      
      </div>
        );
    }
}

function mapStateToProps(state) {
  const { kanbanorders,orderdetails } = state;
  return { kanbanorders,orderdetails };
}

const actionCreators = {
getKanboard: dashboardActions.getKanboard,
getOrderDetails: dashboardActions.getOrderDetails,

}
const connectedDashboardPage = connect(mapStateToProps,actionCreators)(DashboardPage);
export { connectedDashboardPage as DashboardPage };
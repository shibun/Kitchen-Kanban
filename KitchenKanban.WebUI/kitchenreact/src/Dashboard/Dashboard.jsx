import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { dashboardActions } from '../_actions';
import { Header } from '../_components/Header';
import{NewOrder} from '../_components/NewOrder';

class DashboardPage extends React.Component {
 constructor(props) {
        super(props); 
        this.state={
            showform:false,          
            neworders: [],
            beingpreparedorders: [],
            preparedorders: {},
            packingorders: [],
            readyorders: [],
            deliveredorders:[],
        };
        this.handleOnAddClick=this.handleOnAddClick.bind(this);  
        this.toggleOrderDetails=this.toggleOrderDetails.bind(this);
    }
   
  componentDidMount () {   
        this.props.getKanboard();
    }

  handleOnAddClick(){
        this.setState({
            showform:true,      
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
          const beingpreparedorders = nextProps.kanbanorders.items.filter((item) => item.bucketName === "Being Prepared" )[0];
          const preparedorders = nextProps.kanbanorders.items.filter((item) => item.bucketName === "Prepared" )[0];
          const packingorders = nextProps.kanbanorders.items.filter((item) => item.bucketName === "Packing" )[0];
          const readyorders = nextProps.kanbanorders.items.filter((item) => item.bucketName ===  "Ready To Be Delivered" ||item.bucketName === "Takeaway"  )[0];
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
  }

  getordertime(orderdate){
        var initial = new Date(orderdate);
      var final = new Date();  
      var difference = (Math.floor(final.getTime()-initial.getTime())/36e6);  
    return difference;
   }

  toggleOrderDetails(order, index, dividentifier, bucketname) {   
    console.log('order in toggle',order); 
    // if(order.orderStatus==6){
    //   console.log('if block executed in sidetoggle');
    //   return
    // }
    // else{
    //   console.log('else block executed in toggle');
    //    $("#orderdetailsdiv" + dividentifier + index).slideToggle();
    //    this.showorderdetails = !this.showorderdetails;
    //    this.getOrderDetails(order);
    //    this.getFilteredStatus(bucketname, order);
       
    //   }
  }
   
    render() {
      const { kanbanorders } = this.props;
      const {neworders,showform}=this.state;
        console.log('neworders',neworders);
     
        return (
          <div>

    <section>

    <div className="breadcrumb">
        <div>Dashboard</div>
        <div className="current-time">Time </div>
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

 {/* kb colum start */}
      <div className="kb-column">
            <div className="kb-column-header">
              <div className="float-left">
                New Order
                <span className="order-count">{
                  (this.state.neworders && this.state.neworders.length) || 0
                }</span>
              </div>
              <div className="float-right">
                <button className="add-order" onClick={this.handleOnAddClick}>+</button>
              </div>
              <div className="clearfix"></div>
            </div>

{/* //v-if new orders */}
{neworders &&
            <div className="ticket-sec">
{/* //v-for new orders.orders       */} 
{neworders && neworders.map((order, index) => (
              <div id="ordermaindivno" className="ticket-main" key={index}>
                <div className="order-detail" onClick={this.toggleOrderDetails(order, index, 'no', 'neworder')}>
                  <div>
                    <div className="float-left"><img src="../../src/_assets/images/order_number_icon.png"/> { order.orderNumber.split("-")[1]}</div>
                    <div className="float-right"><img src="../../src/_assets/images/time_icon.png"/>{this.getordertime(order.orderDate)}</div>                    
                    <div className="clearfix"></div>
                  </div>
                  
                </div>
{/* //v-if="order.orderLines" */}
                <div id="'orderdetailsdivno' + index" className="order-description" 
                >
                  <table className="order-tbl" >
                    <tbody>
                      <tr className="order-tbl-header">
                        <td className="text-center">Item Name</td>
                        <td className="text-center">Qty</td>
                        <td className="text-center">Price</td>
                      </tr>
                      {/* v-for="(orderline, index) in order.orderLines" */}
                      {order.orderLines &&
                      <tr >
                        <td>{ orderline.itemName }</td>
                        <td className="text-center">
                          { orderline.orderQuantity }
                        </td>
                        <td className="text-right">{ orderline.itemCharge * orderline.orderQuantity}</td>
                      </tr>
    }
                        <tr>
                           <th>Total</th>
                            <th className="text-center">{order.noOfItemsInOrder}</th>
                            <th className="text-right">{order.orderAmount}</th>
                         </tr>
                    </tbody>
                  </table>
                </div>
              </div>
))} 
            </div>
 }
          </div>
      
      {/* kb colum end */}
      </div>
      </div>
         </section>
         {this.state.showform && <div className ="tkt-desc"><NewOrder  handler = {this.handler} showorderform={this.state.showform}></NewOrder></div>}
      
      </div>
        );
    }
}

function mapStateToProps(state) {
  const { kanbanorders } = state;
  return { kanbanorders };
}

const actionCreators = {
getKanboard: dashboardActions.getKanboard,

}
const connectedDashboardPage = connect(mapStateToProps,actionCreators)(DashboardPage);
export { connectedDashboardPage as DashboardPage };
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { itemsListActions,orderActions } from '../_actions';
import { Header } from '../_components/Header';
import { MessageSuccess } from '../_components/MessageSuccess';
import { MessageError } from '../_components/MessageError';
class NewOrder extends React.Component {
     constructor(props) {
        super(props); 
        this._isMounted = false;
        this.state={
                    Order: {
                        orderId: "",
                        orderNumber: "",
                        orderDate: new Date(),
                        customerName: "",
                        customerContactNumber: "",
                        orderAmount: 0.0,
                        orderType: 2,
                        orderStatus: 1,
                        orderTakenBy: "",
                        cancellationReason: "",
                        orderLines: []
                    },
                OrderLine: {
                    orderLineId: "",
                    orderId: "",
                    itemId: "",
                    orderQuantity: "",
                    kitchenId: "",
                    preparedById: "",
                    item: {
                        itemId: '',
                        itemCharge: '',
                        itemName: ''
                    }

                },
                Orderdetails:{
                    Order:{},
                    OrderLines:[]
                },
                list:[],               
                totalqty: 0, 
                showneworderform:false ,
                editmode:false ,
                successmsg:false,
                errormsg:false  
           
        };  
        this.clearForm=this.clearForm.bind(this);  
           this.handleChange = this.handleChange.bind(this);
           this.increment=this.increment.bind(this);
           this.decrement=this.decrement.bind(this);
           this.handleChangeItemSelect=this.handleChangeItemSelect.bind(this);
           this.handleitemdisplay=this.handleitemdisplay.bind(this);
           this.deleteorderline=this.deleteorderline.bind(this);
           this.totalCalculation=this.totalCalculation.bind(this);
           this.addNewOrder=this.addNewOrder.bind(this);
           this.updateNewOrder=this.updateNewOrder.bind(this);
            this.callParentUpdate=this.callParentUpdate.bind(this)
    
    }
  componentDidMount () 
    {  
        this._isMounted = true;
       console.log('mountordertobeedited',this.props.ordertobeedited);
     if( this._isMounted && this.props.ordertobeedited.orderId){
            this.state.Order=this.props.ordertobeedited,       
            this.state.list=this.props.ordertobeedited.orderLines,
            this.state.editmode=true     
        
      }
      this.setState({
          showneworderform:this.props.showorderform
      })
       this.props.dispatch(itemsListActions.getAll());
       
    }

    componentWillUnmount() {
        this._isMounted = false;
     }
       
     handleChange(e) {
        const { name, value } = e.target;      
         const { Order } = this.state;
         this.setState({
            Order: {
                ...Order,
                [name]: value
            }
        });
           
    }
    handleChangeItemSelect(e) {
            var index = e.nativeEvent.target.selectedIndex;
            var text = e.nativeEvent.target[index];          
              this.props.items.items.map((value, index) => {
                    if (value.itemName === e.target.value) {
                        this.setState({
                            OrderLine:{
                            orderLineId : "",
                            orderId : "",
                            itemId : value.itemId,
                            orderQuantity : 1,
                            kitchenId : "",
                            preparedById :"",
                           item : value
                            }
                        },()=>{
                             this.handleitemdisplay(e.target.value);    
                        });                   
           
                        }

                });
            
    }
    handleitemdisplay(evalue){      
                    if(this.state.list &&this.state.list.length==0){                        
                            this.state.list.push(this.state.OrderLine); 
                               this.setState({
                        list: [...this.state.list]},()=>{  this.totalCalculation();});                          
                                    return;
                            }
                            if(this.state.list.length>0){                           
                                let count=0;
                                this.state.list.map((value, index1) => {                                    
                                    if(value.item.itemName==evalue){
                                        count=1;                                       
                                        this.increment(value.orderQuantity,index1);
                                         this.totalCalculation();                                         
                                        return;
                                    }                                   
                                });
                                if(count==0){
                                    this.state.list.push(this.state.OrderLine);
                                     this.setState({
                                list: [...this.state.list]},()=>{  this.totalCalculation();});  
                                      
                                }
                            }
                         
            }  

        
    increment (qty, index) {
                    this.state.list[index].orderQuantity++;                  
                    this.totalCalculation();
            }
    decrement (qty, index) {
                        if (this.state.list[index].orderQuantity > 1) {
                            this.state.list[index].orderQuantity--;
                            this.totalCalculation();                            
                           
                         }
            }  
    deleteorderline(listitem, index) {
                this.state.list.splice(index, 1);
                  this.setState({
                                list: [...this.state.list]},()=>{
                            this.totalCalculation();
                                });                             
              
                      
    }  
    totalCalculation(){
                            
                this.state.Order.orderAmount = 0.0;
                this.state.totalqty = 0;
                     this.state.list.map((value, index) => {                               
                    this.state.Order.orderAmount = parseFloat(this.state.Order.orderAmount) + (parseFloat(value.orderQuantity) * parseFloat(value.item.itemCharge));
                    this.state.totalqty = parseFloat(this.state.totalqty) + parseFloat(value.orderQuantity);
                     });
                     this.setState({
                       totalqty:this.state.totalqty
                     })
                    
                
     }
   
    clearForm(){
        
        this.setState({         
           //showneworderform:false ,
                      Order: {
                        orderId: "",
                        orderNumber: "",
                        orderDate: new Date(),
                        customerName: "",
                        customerContactNumber: "",
                        orderAmount: 0.0,
                        orderType: 2,
                        orderStatus: 1,
                        orderTakenBy: "",
                        cancellationReason: "",
                        orderLines: []
                    },
                OrderLine: {
                    orderLineId: "",
                    orderId: "",
                    itemId: "",
                    orderQuantity: "",
                    kitchenId: "",
                    preparedById: "",
                    item: {
                        itemId: '',
                        itemCharge: '',
                        itemName: ''
                    }

                },
                Orderdetails:{
                    Order:{},
                    OrderLines:[]
                },
                list:[],               
                totalqty: 0,
                //successmsg:false,
                //errormsg:false
            
            
        })   
       
    }
    msgchildhandler = (val) => {

        console.log('msgchildhandler',val);
            this.setState({
            successmsg: val,
            errormsg:val
                })
     
        } 

        callParentUpdate(){
            setTimeout(() => {
                this.props.handler(false);
            }, 600);
        }
    addNewOrder(){
       
       
        this.state.Orderdetails.Order=this.state.Order;
        this.state.Orderdetails.OrderLines=this.state.list;
        if(this.state.Orderdetails.OrderLines.length>0)
        {
                this.props.dispatch(orderActions.addNewOrder(this.state.Orderdetails))
                .then((response) => {
                    this.setState({
                            successmsg:true
                        })
                        this.callParentUpdate();
                    }
                ) .catch((error) => {
                    this.setState({
                        successmsg:false
                    })
                    this.callParentUpdate();
                });
        }
        else{

            this.setState({
               // errormsg:true
                errormsg:'please Add Atleast one Item'
            })
            //this.state.errormsg=true;
            //alert("please Add Atleast one Item");
        }
       
    }
        updateNewOrder(){
        this.state.Orderdetails.Order=this.state.Order;
        this.state.Orderdetails.OrderLines=this.state.list;
        if(this.state.Orderdetails.OrderLines.length>0){
         this.props.dispatch(orderActions.updateNewOrder(this.state.Orderdetails))
         .then((response) => {
            this.setState({
                    successmsg:true
                })
                this.callParentUpdate();
            }
        ) .catch((error) => {
            this.setState({
                successmsg:false
            })
            this.callParentUpdate();
        });
        //this.clearForm();
        }
        else{
              alert("please Add Atleast one Item");
        }
    }
       

    render() {
              const { showorderform,items,handler,alert,createdorder,ordertobeedited } = this.props;
        const {Order,OrderLine,list,totalamount,totalqty,showneworderform,editmode,successmsg,errormsg}=this.state;
      
        return (
          <div>
    {showneworderform && <div >
        <div className="add-overlay" >
            <div className="add-pop-overlay">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" onClick={()=>{this.props.handler(false),this.clearForm}}>×</button>
                    <h4 className="modal-title">New Order</h4>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="row">
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Customer Name </label>
                                    <input type="text" className="form-control" name="customerName" value={Order.customerName || ""} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Customer Phone </label>
                                    <input type="text" className="form-control" name="customerContactNumber" value={Order.customerContactNumber || ""} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                     
                    </form>
                </div>
                <div className="food-order-section">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="food-ordering-header">
                                    Select Item
                                </div>
                            </div>
                        </div>
                          <div className="row">
                            <div className="col-xs-12">
                                <input className="form-control" list="itemList" name="ItemList"  onChange={this.handleChangeItemSelect} />
                                <datalist id="itemList" value={OrderLine.itemId}>
                                   <option>---select---</option>
                                            {
                                                (items) && (items.items) && (items.items.length > 0) && items.items.map((data, index) =>
                                                    (<option key={index}  value={data.itemName} >{data.itemName}</option>))
                                            }
                                </datalist>
                            </div>
                        </div>
                 
                        <div className="row">
                            <div className="col-xs-12">
                                <table className="ordered-items-tbl">
                                <tbody>
                                    <tr>
                                        <th className="text-center">Sl No</th>
                                        <th className="text-center">Item Name</th>
                                        <th className="text-center">Qty</th>                                        
                                        <th className="text-center">Item Price</th>
                                         <th className="text-center">Total Price</th>
                                        <th className="text-center">Delete</th>
                                    </tr>
                                     {this.state.list && this.state.list.map((listitem,index) => 
                                      <tr key={listitem.itemId}>
                                      <td className="text-center">{index+1}</td>
                                        <td>{listitem.item.itemName}</td>
                                        <td className="text-center bold">
                                            <div className="qty-main">
                                                <div className="float-left neg-qty-box">
                                                    <button className="qty-btn" onClick={e=>this.decrement(listitem.orderQuantity,index)} >-</button>
                                                </div>
                                                <div className="float-left qty-box">{listitem.orderQuantity}</div>
                                                <div className="float-left pos-qty-box">
                                                    <button className="qty-btn" onClick={e=>this.increment(listitem.orderQuantity,index)}>+</button>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                        </td>        
                                        <td className="text-right bold">{listitem.item.itemCharge.toFixed(2) }</td>
                                        <td className="text-right bold">{listitem.item.itemCharge*listitem.orderQuantity.toFixed(2) }</td>
                                        <td className="text-center">
                                                    <button className="trans-btn" ><img src="/images/delete.png" onClick={e=>this.deleteorderline(listitem,index)}/></button>
                                                </td>
                                                </tr>
                                      )}
                                     
                                  
                                    <tr>
                                        <td colSpan="2" className="text-center bold">Total</td>
                                        <td className="text-center bold">{this.state.totalqty}</td>
                                        <td>&nbsp;</td>
                                        <td className="text-right bold">${this.state.Order.orderAmount?this.state.Order.orderAmount.toFixed(2):this.state.Order.orderAmount}</td>
                                         <td>&nbsp;</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default left-btn" data-dismiss="modal" onClick={()=>{this.props.handler(false),this.clearForm}}>Cancel</button>
                   {!editmode && <button  type="button" className="btn btn-active" data-dismiss="modal" onClick={this.addNewOrder}>Add</button> } 
                    {editmode &&<button  type="button" className="btn btn-active" data-dismiss="modal" onClick={this.updateNewOrder}>Update</button> }
                </div>
            </div>
        </div>
      
    </div>}
     {this.state.successmsg &&
               <div className ="tkt-desc"> <MessageSuccess  handler = {this.msgchildhandler} showsuccessform={this.state.successmsg}/></div>
            }
               {this.state.errormsg &&
               <div className ="tkt-desc"> <MessageError   handler = {this.msgchildhandler} msg={'Please fill mandatory fields'} showerrorform={this.state.errormsg}/></div>
            }
        
      </div>
        );
    }
}

function mapStateToProps(state) {
    const { items,alert,createdorder } = state;
    return {items,alert,createdorder     
    };
}

const connectedNewOrder = connect(mapStateToProps)(NewOrder);
export { connectedNewOrder as NewOrder };
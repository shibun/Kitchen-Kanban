import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header } from '../_components/Header';
class NewOrder extends React.Component {
  componentDidMount () {
       
    }

    render() {
        const {  } = this.props;
        return (
          <div>

     <div >
        <div class="add-overlay" >
            <div class="add-pop-overlay">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" >×</button>
                    <h4 class="modal-title">New Order</h4>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row">
                            <div class="col-xs-6">
                                <div class="form-group">
                                    <label>Customer Name </label>
                                    <input type="text" class="form-control" />
                                </div>
                            </div>
                            <div class="col-xs-6">
                                <div class="form-group">
                                    <label>Customer Phone </label>
                                    <input type="text" class="form-control" />
                                </div>
                            </div>
                        </div>
                     
                    </form>
                </div>
                <div class="food-order-section">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="food-ordering-header">
                                    Select Item
                                </div>
                            </div>
                        </div>
                 
                        <div class="row">
                            <div class="col-xs-12">
                                <table class="ordered-items-tbl">
                                    <tr>
                                        <th class="text-center">Sl No</th>
                                        <th class="text-center">Item Name</th>
                                        <th class="text-center">Qty</th>                                        
                                        <th class="text-center">Item Price</th>
                                         <th class="text-center">Total Price</th>
                                        <th class="text-center">Delete</th>
                                    </tr>
                                  
                                    <tr>
                                        <td colspan="2" class="text-center bold">Total</td>
                                        <td class="text-center bold">9</td>
                                        <td>&nbsp;</td>
                                        <td class="text-right bold">100</td>
                                         <td>&nbsp;</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default left-btn" data-dismiss="modal" >Cancel</button>
                    <button  type="button" class="btn btn-active" data-dismiss="modal" >Add</button>
                    <button  type="button" class="btn btn-active" data-dismiss="modal" >Update</button>
                </div>
            </div>
        </div>
      
    </div>
        
      </div>
        );
    }
}

function mapStateToProps(state) {
    const {  } = state;
    return {
         
    };
}

const connectedNewOrder = connect(mapStateToProps)(NewOrder);
export { connectedNewOrder as NewOrder };
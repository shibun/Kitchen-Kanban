import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { itemsListActions } from '../_actions';

class ItemsList extends React.Component {
    constructor(props) {
        super(props);  
   
    }
     componentDidMount() {
        this.props.dispatch(itemsListActions.getAll());
    }

  
   

    render() {
        const { items} = this.props;
        
        return (
      <div>      
             <nav className="navbar navbar-inverse">
        <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" href="dashboard.html">My Kitchen</a>
            </div>
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Pramod Karkera</a></li>
                <li><a href="login.html"><i className="glyphicon glyphicon-log-out"></i></a></li>
            </ul>
        </div>
    </nav>
    <div>
        <aside>
            <ul className="nav-menu-ul">
                <li><a href="dashboard.html">Dashboard</a></li>
                <li><a href="userList.html">User List</a></li>
                <li><a href="kitchenCounterList.html">Kitchen Counter List</a></li>
                <li><a href="itemList.html">Item List</a></li>
                <li><a href="report.html">Reports</a></li>
            </ul>
        </aside>
        <section>
            <div className="breadcrumb">Item List</div>
            <div className="list-sec">
                <div className="text-right">
                    <button className="trans-btn">
                        <img src="images/add.png" />
                    </button>
                </div>
                <table className="custom-tbl">
                    <tbody>
                        <tr>
                            <th className="text-center">Sl No</th>
                            <th className="text-center">Item Image</th>
                            <th className="text-center">Item Name</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Edit</th>
                            <th className="text-center">Delete</th>
                        </tr>
                          {items && items.map((item, index) =>                                         
                                          
                                        <tr key={item.itemId}>
                                            <td className="text-center">{index+1}</td>                                            
                                            <td>{item.itemName}</td>
                                        
                                       <td className="text-center"><img src="images/edit.png" /></td>
                                        <td className="text-center"><img src="images/delete.png" /></td>
                                        </tr>
        
                                            )}
                             
                        <tr>
                            <td className="text-center">3</td>
                            <td className="text-center"><img src="images/pizza.png" /></td>
                            <td>Deluxe Veggie</td>
                            <td className="text-right">$180.00</td>
                            <td className="text-center">
                                <button className="trans-btn"><img src="images/edit.png" /></button>
                            </td>
                            <td className="text-center">
                                <button className="trans-btn"><img src="images/delete.png" /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <div className="clearfix"></div>
    </div>
    
<div className="overlay" style={{display:"none"}}>
        <div className="pop-overlay">
            <div className="success-header">
                <img src="images/success.png" />
            </div>
            <div className="text-center pop-header">Great!</div>
            <div className="text-center">Successfully Updated</div>
            <div className="text-center">
                <button className="success-btn">Continue</button>
            </div>
        </div>
    </div>


    <div className="overlay" style={{display:"none"}}>
        <div className="pop-overlay">
            <div className="error-header">
                <img src="images/error.png" />
            </div>
            <div className="text-center pop-header">Error!</div>
            <div className="text-center">Error message shown up here</div>
            <div className="text-center">
                <button className="error-btn">Continue</button>
            </div>
        </div>
    </div>
    <div className="add-overlay" style={{display:"none"}}>
        <div className="add-pop-overlay">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">×</button>
                <h4 className="modal-title">Add Item</h4>
            </div>
            <div className="modal-body">
                <form>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Item Name <span class="asterisk">*</span></label>
                                    <input type="text" class="form-control"/>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Item Price <span className="asterisk">*</span></label>
                                    <input type="text" className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-4">
                                <div className="form-group">
                                    <label>Item Image</label>
                                    <img src="images/no_item_img.png" />
                                </div>
                            </div>
                            <div className="col-xs-8">
                                <button className="user-img-upload-btn">Upload</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" className="btn btn-default left-btn" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-active" data-dismiss="modal">Add</button>
            </div>
        </div>
    </div>


 
</div>


        );
    }
}

function mapStateToProps(state) {
    const {items } = state;
    return {items};
}


const connectedItemsList = connect(mapStateToProps)(ItemsList);
export { connectedItemsList as ItemsList }; 
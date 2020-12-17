import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { itemsListActions } from '../_actions';
import { Header } from '../_components/Header';


class ItemsList extends React.Component {
    constructor(props) {
        super(props); 
        this.state={
            showform:false,
            item:{
                itemId:'',
                itemName:'',
                itemPrice:''
            }
        };
         this.handleOnAddClick=this.handleOnAddClick.bind(this);  
         //this.clearForm=this.clearForm.bind(this);   
   
    }
     componentDidMount() {
        this.props.dispatch(itemsListActions.getAll());
    }
    handleOnAddClick(){
        this.setState({
            showform:true,
      
        });
        
    }
  
   

    render() {
        const { items} = this.props;
        
        return (
      <div>   
            <div>
                    <Header />
                    <section>
                        <div className="breadcrumb">Item List</div>
                        <div className="list-sec">
                            <div className="text-right">
                                <button className="trans-btn">
                                    <img src="images/add.png" onClick={this.handleOnAddClick}/>
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
              
         {
             this.state.showform &&
          <div className="add-overlay" >
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
                                            <label>Item Name <span className="asterisk">*</span></label>
                                            <input type="text" className="form-control"/>
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
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default left-btn" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-active" data-dismiss="modal">Add</button>
                    </div>
                </div>
            </div> 
            }
    
    
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
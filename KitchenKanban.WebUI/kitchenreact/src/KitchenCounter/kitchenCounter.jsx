import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../_components/Header';

import { kitchenCounterActions } from '../_actions';

class KitchenCounter extends React.Component {
    constructor(props) {
        super(props);  
          
          this.state={
              showform:false,
            kitchen:{
                kitchenId:"",
                counterNumber:""
                },
                     
             editmode:false
          };
        this.handleOnAddClick=this.handleOnAddClick.bind(this);  
        this.handleChange = this.handleChange.bind(this);
        this.clearForm=this.clearForm.bind(this);  
         this.addCounter=this.addCounter.bind(this);
        this.deleteCounter=this.deleteCounter.bind(this); 
        this.handleOnEdit=this.handleOnEdit.bind(this);  
        this.updateCounter=this.updateCounter.bind(this); 
   
    }
     componentDidMount() {
        this.props.dispatch(kitchenCounterActions.getAll());
    }
        handleOnAddClick(){
        this.setState({
            showform:true,      
        });
        
    }
      clearForm(){
        this.setState({
             showform:false,
            kitchen:{
                kitchenId:"",
                counterNumber:""
                },                    
            
             editmode:false
        })
    }
     handleChange(e) {
        const { name, value } = e.target;      
         const { kitchen } = this.state;
         this.setState({
            kitchen: {
                ...kitchen,
                [name]: value
            }
        });
           
    }
      handleOnEdit(editedcounter){
        this.setState({
            showform:true,
            kitchen:editedcounter,
            editmode:true
        })
    }
     addCounter(){          
            this.props.dispatch(kitchenCounterActions.addCounter(this.state.kitchen));  
            this.clearForm();
              this.props.dispatch(kitchenCounterActions.getAll());          
    }
        updateCounter(){             
         this.props.dispatch(kitchenCounterActions.updateCounter(this.state.kitchen)); 
         this.clearForm();
        this.props.dispatch(kitchenCounterActions.getAll());            
        }
    deleteCounter(itemid) {       
      this.props.dispatch(kitchenCounterActions.deleteCounter(itemid));
       this.props.dispatch(kitchenCounterActions.getAll());
       
    }
  
    render() {
        const { kitchenCounters} = this.props;
        const {kitchen,editmode,showform}=this.state;
        
        return (
    <div>
        
         <div>
       <Header/>
         <section>
            <div className="breadcrumb">Kitchen Counter List</div>
            <div className="list-sec">
                <div className="text-right">
                    <button className="trans-btn">
                        <img src="images/add.png"   onClick={this.handleOnAddClick}/>
                    </button>
                </div>
                <table className="custom-tbl">
                    <tbody>
                        <tr>
                            <th className="text-center">Sl No</th>
                            <th className="text-center">Counter Name</th>
                            <th className="text-center">Edit</th>
                            <th className="text-center">Delete</th>
                        </tr>
                                 {kitchenCounters && kitchenCounters.items &&kitchenCounters.items.map((counter, index) =>                                         
                                                    
                                                    <tr key={counter.counterId}>
                                                        <td className="text-center">{index+1}</td>                                            
                                                        <td>{counter.counterNumber}</td>
                                                    
                                                <td className="text-center"><img src="images/edit.png" onClick={e=>this.handleOnEdit(counter)} /></td>
                                                    <td className="text-center"><a onClick={e =>
                                                        window.confirm("Are you sure you wish to delete this item?") &&
                                                        this.deleteCounter(counter.kitchenId)
                                                    }><img src="images/delete.png" /></a></td>
                                                    </tr>
                    
                                                        )}
                      
                       
                        
                    </tbody>
                </table>
            </div>
        </section>
        <div className="clearfix"></div>
        </div>

        {this.state.showform &&
        <div className="add-overlay" >
            <div className="add-pop-overlay">
                <div className="modal-header">
                <button   type="button" className="close" data-dismiss="modal" onClick={this.clearForm} > × </button>
                <h4 className="modal-title">Add Kitchen Counter</h4>
                </div>
                <div className="modal-body">
                <form>
                    <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-6">
                        <div className="form-group">
                            <label
                            >Kitchen Counter Name
                            <span className="asterisk">*</span></label
                            >
                            <input type="text" name="counterNumber" className="form-control" value={kitchen.counterNumber || ""} onChange={this.handleChange}  />
                        </div>
                        </div>
                    </div>
                    </div>
                </form>
                </div>
                <div className="modal-footer">
                <button  type="button"  className="btn btn-default left-btn"   data-dismiss="modal"    onClick={this.clearForm}  > Cancel</button>
                {
                    !this.state.editmode &&
                <button  type="button"  className="btn btn-active"   data-dismiss="modal"  onClick={this.addCounter} >  Add </button>
                 }
                 {    
                  this.state.editmode &&
                               <button type="button" className="btn btn-active"  data-dismiss="modal" onClick={this.updateCounter} >Update</button>
                 }
             
                </div>
            </div>
            </div>
        }
  

</div>

        );
    }
}

function mapStateToProps(state) {
    const {kitchenCounters } = state;
    return {kitchenCounters};
}


const connectedKitchenCounter = connect(mapStateToProps)(KitchenCounter);
export { connectedKitchenCounter as KitchenCounter }; 
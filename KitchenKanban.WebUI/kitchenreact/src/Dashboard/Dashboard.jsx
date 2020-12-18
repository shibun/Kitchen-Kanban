import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { Header } from '../_components/Header';
import{NewOrder} from '../_components/NewOrder';

class DashboardPage extends React.Component {
 constructor(props) {
        super(props); 
        this.state={
            showform:false,          
           
        };
        
        this.handleOnAddClick=this.handleOnAddClick.bind(this);  
       

   
    }
  componentDidMount () {
        this.props.dispatch(userActions.getAll());
    }
     handleOnAddClick(){
        this.setState({
            showform:true,      
        });
        
    }
    render() {
        const { user, users } = this.props;
        let {showform}=this.state;
        return (
          <div>

    <section>

    <div className="breadcrumb">
        <div>Dashboard</div>
        <div className="current-time">Time</div>
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
          <div className="kb-column">
                  <div className="kb-column-header">
                    <div className="float-left">
                      New Order
                      <span className="order-count">0</span>
                    </div>
                    <div className="float-right">
                      <button className="add-order" onClick={this.handleOnAddClick}>+</button>
                    </div>
                    <div className="clearfix"></div>
                  </div>
              
            </div> 
      </div>
      </div>
         </section>
         {showform&& <div className ="tkt-desc"><NewOrder  showorderform={showform}></NewOrder></div>}
      
      </div>
        );
    }
}

function mapStateToProps(state) {
    const { users } = state;
    return {
         users
    };
}

const connectedDashboardPage = connect(mapStateToProps)(DashboardPage);
export { connectedDashboardPage as DashboardPage };
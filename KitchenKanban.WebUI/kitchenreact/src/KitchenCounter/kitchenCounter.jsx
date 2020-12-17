import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { kitchenCounterActions } from '../_actions';

class KitchenCounter extends React.Component {
    constructor(props) {
        super(props);  
   
    }
     componentDidMount() {
        this.props.dispatch(kitchenCounterActions.getAll());
    }

  
   

    render() {
        const { kitchenCounters} = this.props;
        
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
            <div className="breadcrumb">Kitchen Counter List</div>
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
                            <th className="text-center">Counter Name</th>
                            <th className="text-center">Edit</th>
                            <th className="text-center">Delete</th>
                        </tr>
                        <tr>
                            <td className="text-center">1</td>
                            <td>Counter 1</td>
                            <td className="text-center">
                                <button className="trans-btn"><img src="images/edit.png" /></button>
                            </td>
                            <td className="text-center">
                                <button className="trans-btn"><img src="images/delete.png" /></button>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">2</td>
                            <td>Counter 2</td>
                            <td className="text-center">
                                <button className="trans-btn"><img src="images/edit.png" /></button>
                            </td>
                            <td className="text-center">
                                <button className="trans-btn"><img src="images/delete.png" /></button>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">3</td>
                            <td>Counter 3</td>
                            <td className="text-center">
                                <button className="trans-btn"><img src="images/edit.png" /></button>
                            </td>
                            <td className="text-center">
                                <button className="trans-btn"><img src="images/delete.png" /></button>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">4</td>
                            <td>Counter 4</td>
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
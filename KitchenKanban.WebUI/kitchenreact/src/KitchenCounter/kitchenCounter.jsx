import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../_components/Header';

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
        
         <div>
       <Header/>
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
                                 {kitchenCounters && kitchenCounters.map((counter, index) =>                                         
                                                    
                                                    <tr key={counter.counterId}>
                                                        <td className="text-center">{index+1}</td>                                            
                                                        <td>{counter.counterName}</td>
                                                    
                                                <td className="text-center"><img src="images/edit.png" /></td>
                                                    <td className="text-center"><img src="images/delete.png" /></td>
                                                    </tr>
                    
                                                        )}
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
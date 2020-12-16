import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { Header } from '../_components/Header';

class DashboardPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        const { user, users } = this.props;
        return (
          <div>
               
            <div className="col-md-6 col-md-offset-3">
                <h3>DashBoard</h3>
                
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div></div>
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
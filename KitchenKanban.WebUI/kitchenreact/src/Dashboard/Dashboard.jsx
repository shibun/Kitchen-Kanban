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

    <section>

    <div className="breadcrumb">
        <div>Dashboard</div>
        <div className="current-time">Time</div>
        <div className="clearfix"></div>
      </div>
    </section>
        
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
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../_actions';


class Header extends React.Component {
    componentDidMount() {
      
    }

    render() {
        return ( 
          
            <div>
            <nav className="navbar navbar-inverse">
                 <div className="container-fluid">
                     <div className="navbar-header">
                         <Link to="/login">My Kitchen</Link>
                     </div>
                     {/* <ul className="nav navbar-nav navbar-right">
                         <li><a>
                         <img className="user-img" src="../assets/images/user_img.png" v-if="!usrImage"/> 
                            <img src="'data:image/jpeg;base64,'+ usrImage" className="display-user-img"/>
                            {{loggedUser && loggedUser.userFullName}}
                            </a></li>
                         <li><a href=""  ><i className="glyphicon glyphicon-log-out"></i></a></li>
                     </ul> */}
                 </div>
             </nav>
         
              <div>
                 <aside>
                     <ul className="nav-menu-ul">
                     {/* <Switch>
                     <PrivateRoute exact path="/" component={props => <DashboardPage {...props} />} />
                     <Route path="/login" component={props => <LoginPage {...props} />}  /> 
                       <li><Link to="/">Dashboard</Link></li>
                         <li><Link to="/user">User List</Link></li>
                         <li><Link to="/kitchencounterlist">Kitchen Counter List</Link></li>
                         <li><Link to="/itemsList">Item List</Link></li>
                         <li><Link to="/reports">Reports</Link></li> */}
                    
                     </ul>
                 </aside>
                 <div className="clearfix"></div>
             </div>
             </div>
           
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHeader = connect(mapState, actionCreators)(Header);
export { connectedHeader as Header };
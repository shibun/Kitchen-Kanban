import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../_actions';

class Header extends React.Component {
    componentDidMount() {
      
    }

    render() {
        const { user,loggedIn } = this.props;
        return ( 
          
            <div>
      {loggedIn &&
      <div>
            <nav className="navbar navbar-inverse">
                 <div className="container-fluid">
                     <div className="navbar-brand">
                         <Link to="/">My Kitchen</Link>
                     </div>
                      <ul className="nav navbar-nav navbar-right">
                         <li><a>
                         <img className="user-img" src="../src/assets/images/user_img.png"/> 
                       
                        {user && user.userFullName} 
                            </a></li>
                         <li><Link to="/login"><i className="glyphicon glyphicon-log-out"></i></Link></li>
                     </ul> 
                 </div>
             </nav>
         
              <div>
                 <aside>
                     <ul className="nav-menu-ul">
                     {/* <Switch>
                     <PrivateRoute exact path="/" component={props => <DashboardPage {...props} />} />
                     <Route path="/login" component={props => <LoginPage {...props} />}  /> */}
                         <li><Link to="/">Dashboard</Link></li>
                         <li><Link to="/user">User List</Link></li>
                         <li><Link to="/kitchencounterlist">Kitchen Counter List</Link></li>
                         <li><Link to="/itemsList">Item List</Link></li>
                         <li><Link to="/reports">Reports</Link></li> 
                    
                     </ul>
                 </aside>
                 <div className="clearfix"></div>
             </div>
    
    </div>
    }
             </div>
           
        );
    }
}

function mapState(state) {
    const { authentication } = state;
    const { user,loggedIn } = authentication;
    return { user, loggedIn };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHeader = connect(mapState, actionCreators)(Header);
export { connectedHeader as Header };
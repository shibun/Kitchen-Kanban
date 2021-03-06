 import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { Switch, Route, withRouter, Router, Link } from "react-router-dom";
import { PrivateRoute } from "../_components";
import { Header } from "../_components/Header";





const LoginPage = lazy(() => import("../LoginPage"));
const DashboardPage = lazy(() => import("../Dashboard"));
//<<<<<<< HEAD
const UserListPage = lazy(() => import("../MasterPages"));
const Reports = lazy(() => import("../Reports"));
//=======
const ItemsList = lazy(() => import("../ItemsListPage"));
const KitchenCounter=lazy(()=>import("../KitchenCounter"));
//>>>>>>> c06229df90ae777011e3035824b7639aa3c2472f

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        <Router history={history}>
          <div>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <PrivateRoute
                  exact
                  path="/"
                  component={(props) => <DashboardPage {...props} />}
                />
                <Route
                  path="/login"
                  component={(props) => <LoginPage {...props} />}
                />
                 <Route
                  path="/userlist"
                  component={(props) => <UserListPage {...props} />}
                />
                 <PrivateRoute
                  exact
                  path="/itemsList"
                  component={(props) => <ItemsList {...props} />}
                />
                 <PrivateRoute
                  exact
                  path="/kitchencounterlist"
                  component={(props) => <KitchenCounter {...props} />}
                />
                <PrivateRoute
                  exact
                  path="/reports"
                  component={(props) => <Reports {...props} />}
                />
                 
              </Switch>
            </Suspense>
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert ,authentication} = state;
  const { loggedIn } = authentication;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };

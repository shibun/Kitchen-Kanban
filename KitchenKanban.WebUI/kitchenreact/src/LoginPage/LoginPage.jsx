import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../_actions";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      username: "",
      password: "",
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <div>
        <div className="login-sec">
          <div className="login-flex">
            <div className="login-left-sec">
              <div className="welcome-text">Welcome to My Kitchen</div>
              <p className="welcome-des">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
            </div>
            <div className="login-right-sec">
              <h3 className="login-header">Login</h3>
              <form className="top50 bottom50" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username} onChange={this.handleChange} 
                    name="username"
                  ></input>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password} onChange={this.handleChange}
                    name="password"
                  />
                </div>
                <div className="text-center">
                  <button className="login-btn" type="submit">
                    Login
                  </button>
                  <div v-if="!loginsuccess" id="validation1">
                    <span>Username or password is wrong</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn,
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };

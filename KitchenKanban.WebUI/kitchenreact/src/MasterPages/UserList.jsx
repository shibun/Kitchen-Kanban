import React from "react";
import { connect } from "react-redux";
import { userActions } from "../_actions";

class UserListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userId: "",
        firstName: "",
        lastName: "",
        userName: "",
        userType: "",
        password: "",
      },
      userTypes: [
        { id: 1, value: "Administrator" },
        { id: 2, value: "FrontDesk" },
        { id: 3, value: "Chef" },
        { id: 4, value: "BackOffice" },
        { id: 5, value: "Service" },
      ],
      currentdate: "",
      submitted: false,
      editmode: false,
      imgSrc:'',
      file: ''
    };
    
    this.editUser = this.editUser.bind(this);
    this.showAddUser = this.showAddUser.bind(this);
    this.getNow = this.getNow.bind(this);
    
    this.handleChange = this.handleChange.bind(this);
    this.hideAddUser = this.hideAddUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.catchFile = this.catchFile.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
    this.getNow();
  }

  getNow = function () {
    const today = new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" +today.getDate();
    const time =today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;
    this.setState({
      currentdate: dateTime,
    });
  };


  showAddUser(){
    this.setState({
      editmode: true,
    });
  }
  hideAddUser(){
    this.setState({
      editmode: false,
    });
  }
  editUser(editUser){
    console.log('editUser',editUser)
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { user } = this.state;
    this.setState({
      user: {
            ...user,
            [name]: value
        }
    });
}

catchFile(e) {

  var file = e.target.files[0];
  var reader = new FileReader();
  var url = reader.readAsDataURL(file);

  this.setState({
      file: file
  });

  reader.onloadend = function (e) {
      this.setState({
          imgSrc: [reader.result]
      })
  }.bind(this);

}
  handleSubmit(e) {
    e.preventDefault();
    // this.setState({ submitted: true });
    // const { employee } = this.state;
    // if (employee.EmployeeCode && employee.LastName && employee.UserName && employee.Password && employee.DesignationId &&
    //     employee.DateOfJoining && employee.Email && employee.Phone && employee.TeamId && employee.Gender) {
    //     this.props.createEmployee(employee);
    // }
}
  render() {
    const { users } = this.props;
    let { user} = this.state;
    return (
      <div>
        <section>
          <div className="breadcrumb">
            <div>User List</div>
            <div className="current-time">{this.state.currentdate}</div>
            <div className="clearfix"></div>
          </div>
          <div className="list-sec">
            <div className="text-right">
              <button className="trans-btn" onClick={this.showAddUser}>
                <img src="../../src/_assets/images/add.png" />
              </button>
            </div>
            <table className="custom-tbl">
              <tbody>
                <tr>
                  <th className="text-center">Sl No</th>
                  <th className="text-center">User Image</th>
                  <th className="text-center">User Name</th>
                  <th className="text-center">User Id</th>
                  <th className="text-center">User Type</th>
                  <th className="text-center">Edit</th>
                </tr>
                {users.items &&
                  users.items.map((data, index) => (
                    <tr key={data.userId}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">
                        <img
                          src="../../src/_assets/images/no_user_img.png"
                          className="display-user-img"
                        />
                      </td>
                      <td>
                        {data.firstName} {data.lastName}
                      </td>
                      <td>{data.userName}</td>
                      <td>{data.userType}</td>
                      <td className="text-center">
                        <button
                          onClick={this.editUser(data)}
                          data-toggle="modal"
                          data-target="#addUser"
                          className="trans-btn"
                        >
                          <img src="../../src/_assets/images/edit.png" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

{this.state.editmode  &&
<div className="add-overlay">
      <div className="add-pop-overlay">
        <div className="modal-header">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
             onClick={this.hideAddUser}
          >
            ×
          </button>
        <h4 className="modal-title">Add User</h4>
        </div>
        <div className="modal-body">
          <form>
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-6">
                  <div className="form-group">
                    <label>First Name <span className="asterisk">*</span></label>
                    <input
                      name="firstName" value={user.firstName} onChange={this.handleChange} 
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-xs-6">
                  <div className="form-group">
                    <label>Last Name <span className="asterisk">*</span></label>
                    <input
                      value={user.lastName} onChange={this.handleChange}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-6">
                  <div className="form-group">
                    <label>User Type <span className="asterisk">*</span></label>
                    <select className="form-control" value={user.userType} onChange={this.handleChange}>
                      <option disabled value="">--select--</option>
                      {
                                                this.state.userTypes &&
                                                this.state.userTypes.map((type, index) =>
                                                    (<option key={index} value={type.id}>{type.value}</option>))
                                            }
                    </select>
                  </div>
                </div>
                <div className="col-xs-6">
                  <div className="form-group">
                    <label>User Name <span className="asterisk">*</span></label>
                    <input
                      value={user.userName} onChange={this.handleChange}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="row" v-if="!user.userId">
                <div className="col-xs-6">
                  <div className="form-group">
                    <label>Password<span className="asterisk">*</span></label>
                    <input
                      value={user.password} onChange={this.handleChange}
                      type="password"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-xs-6"></div>
              </div>
              <div className="row">
                <div className="col-xs-4">
                  <div className="form-group">
                    <label>User Image</label>
                      <img className="uploaded-user-img" src={this.state.imgSrc} onError={(e) => { e.target.onerror = null; e.target.src = "../../src/_assets/images/no_user_img.png" }}/>
                  </div>
                </div>
                <div className="col-xs-8">
                 
                   <label className="user-img-upload-btn" >
                     <input type="file" name="file" multiple=""  onChange={this.catchFile}/>
                     Upload
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={this.hideAddUser}
            className="btn btn-default left-btn"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button 
            type="submit"
            onClick={this.handleSubmit}
            className="btn btn-active"
            data-dismiss="modal"
          >
            Add
          </button>
           <button
            type="submit"
            onClick={this.handleSubmit}
            className="btn btn-active"
            data-dismiss="modal"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  }
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users } = state;
  return { users };
}

const connectedUserListPage = connect(mapStateToProps)(UserListPage);
export { connectedUserListPage as UserListPage };

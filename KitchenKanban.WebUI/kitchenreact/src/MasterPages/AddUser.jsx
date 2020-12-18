import React from "react";
import { connect } from "react-redux";
import { userActions } from "../_actions";

class AddUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      designation: {
        DesignationName: "",
        DesignationId: 0,
        IsActive: true,
      },
      currentdate: "",
      submitted: false,
      editmode: false,
    };
    // this.handleChange = this.handleChange.bind(this);
    //this.editUser = this.editUser.bind(this);
    //this.showAddUser = this.showAddUser.bind(this);
  }
  componentDidMount() {
    //this.props.dispatch(userActions.getAll());
    
  }

  render() {
    const { user, users } = this.props;
    return (
      <div>
        <div class="add-overlay" v-if="isAddUser">
        <div class="add-pop-overlay">
        <div class="modal-header">
          <button
            type="button"
            class="close"
          >
            ×
          </button>
        <h4 class="modal-title">Add User</h4>
        </div>
        <div class="modal-body">
          <form>
            <div class="container-fluid">
              <div class="row">
                <div class="col-xs-6">
                  <div class="form-group">
                    <label>First Name <span class="asterisk">*</span></label>
                    <input
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-xs-6">
                  <div class="form-group">
                    <label>Last Name <span class="asterisk">*</span></label>
                    <input
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
                </div>
          </form>
        </div>
        
        </div>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  const { users } = state;
  return { users };
}

const connectedAddUserPage = connect(mapStateToProps)(AddUserPage);
export { connectedAddUserPage as AddUserPage };

<template>
  <div>
    <section>
      <div class="breadcrumb">User List</div>
      <div class="list-sec">
        <div class="text-right">
          <button class="trans-btn" @click="showAddUser">
            <img src="../assets/../assets/images/add.png" />
          </button>
        </div>
        <table class="custom-tbl">
          <tbody>
            <tr>
              <th class="text-center">Sl No</th>
              <th class="text-center">User Image</th>
              <th class="text-center">User Name</th>
              <th class="text-center">User Id</th>
              <th class="text-center">User Type</th>
              <th class="text-center">Edit</th>
              <th class="text-center">Delete</th>
            </tr>
            <tr v-bind:key="data.userId" v-for="(data, index) in users">
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">
                <img src="../assets/images/user_img.png" />
              </td>
              <td>{{ data.firstName }} {{ data.lastName }}</td>
              <td>{{ data.userName }}</td>
              <td>{{ data.userType }}</td>
              <td class="text-center">
                <button
                  @click="editUser(data)"
                  data-toggle="modal"
                  data-target="#addUser"
                  class="trans-btn"
                >
                  <img src="../assets/images/edit.png" />
                </button>
              </td>
              <td class="text-center">
                <button class="trans-btn">
                  <img src="../assets/images/delete.png" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div class="clearfix"></div>

    <div class="add-overlay" v-if="isAddUser">
      <div class="add-pop-overlay">
        <div class="modal-header">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            @click="hideAddUser"
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
                      v-model="user.firstName"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-xs-6">
                  <div class="form-group">
                    <label>Last Name <span class="asterisk">*</span></label>
                    <input
                      v-model="user.lastName"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-6">
                  <div class="form-group">
                    <label>User Type <span class="asterisk">*</span></label>
                    <select class="form-control" v-model="user.userType">
                      <option disabled value="">--select--</option>
                      <option
                        v-bind:key="index"
                        v-for="(item, index) in userTypes"
                        v-bind:value="item.id"
                      >
                        {{ item.value }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-xs-6">
                  <div class="form-group">
                    <label>User Name <span class="asterisk">*</span></label>
                    <input
                      v-model="user.userName"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-6">
                  <div class="form-group">
                    <label>Password<span class="asterisk">*</span></label>
                    <input
                      v-model="user.password"
                      type="password"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-xs-6"></div>
              </div>
              <div class="row">
                <div class="col-xs-4">
                  <div class="form-group">
                    <label>User Image</label>
                    <img src="../assets/images/no_user_img.png" />
                  </div>
                </div>
                <div class="col-xs-8">
                  <button class="user-img-upload-btn">Upload</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            @click="clearForm"
            class="btn btn-default left-btn"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="submit"
            @click="addUser"
            class="btn btn-active"
            data-dismiss="modal"
          >
            Add
          </button>
        </div>
      </div>
    </div>
    <MessageSuccess :msg="successmsg" v-on:on-success="getUsers" />
    <MessageError :msg="errormsg" v-on:on-error="onError" />
  </div>
</template>
<script>
import userService from "../services/userService";
//import appDataMixin from '../mixins/appDataMixin'
import MessageSuccess from "@/components/MessageSuccess.vue";
import MessageError from "@/components/MessageError.vue";
import Vue from "vue";
export default {
  name: "User",
  //mixins:[appDataMixin],
  data() {
    return {
      successmsg: "",
      errormsg: "",
      users: null,
      isAddUser: false,
      userTypes: [
        { id: 1, value: "Administrator" },
        { id: 2, value: "FrontDesk" },
        { id: 3, value: "Chef" },
        { id: 4, value: "BackOffice" },
        { id: 5, value: "Service" },
      ],
      user: {
        UserId: "",
        firstName: "",
        lastName: "",
        userName: "",
        userType: "",
        password: "",
      },
    };
  },
  components: {
    MessageSuccess,
    MessageError,
  },
  created() {
    this.getUsers();
    //this.userTypes=this.$data
  },
  methods: {
    getUsers() {
      this.successmsg = "";
      userService
        .getUsers()
        .then((response) => (this.users = response.data))
        .catch((err) => {
          (this.errormsg = err.messge), console.log(err.message);
        });
    },
    showAddUser() {
      this.isAddUser = true;
    },
    hideAddUser() {
      this.isAddUser = false;
    },
    addUser() {
      this.errormsg = "";
      if (!this.user.firstName) {
        this.errormsg = "Please enter First Name";
        return;
      }
      if (!this.user.lastName) {
        this.errormsg = "Please enter Last Name";
        return;
      }
      userService
        .addUser(this.user)
        .then((response) => (this.successmsg = "user added"), this.clearForm())
        .catch((err) => {
          (this.errormsg = err.messge), console.log(err.message);
        });
    },
    editUser: function (data) {
      console.log(data);
      this.user = data;
      this.isAddUser = true;
    },
    onError() {
      console.log("onError parent");
      this.errormsg = "";
    },
    clearForm() {
      this.isAddUser = false;
      this.user = {
        UserId: "",
        FirstName: "",
        LastName: "",
        UserName: "",
        UserType: "",
        Password: "",
      };
    },
  },
};
</script>

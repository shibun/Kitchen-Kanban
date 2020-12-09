<template>
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
              <div class="row" v-if="!user.userId">
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
          <button v-if="!user.userId"
            type="submit"
            @click="addUser"
            class="btn btn-active"
            data-dismiss="modal"
          >
            Add
          </button>
           <button v-if="user.userId"
            type="submit"
            @click="updateUser"
            class="btn btn-active"
            data-dismiss="modal"
          >
            Update
          </button>
        </div>
      </div>
    </div>
</template>
<script>
import userService from "../services/userService";
export default {
    name:"AddUser",
    props:['isAddUser','edituser'],
     data() {
    return {
      successmsg: "",
      errormsg: "",
      userTypes: [
        { id: 1, value: "Administrator" },
        { id: 2, value: "FrontDesk" },
        { id: 3, value: "Chef" },
        { id: 4, value: "BackOffice" },
        { id: 5, value: "Service" },
      ],
      user: {
        userId: "",
        firstName: "",
        lastName: "",
        userName: "",
        userType: "",
        password: "",
      },
    };
  },
  methods:{
      hideAddUser() {
        this.$emit('clear-add-user');
    },
    addUser(){
         this.$emit("add-user",this.user);
    },
    updateUser(){
      this.$emit("update-user",this.user);
    },
    clearForm() {
       this.user = {
        userId: "",
        firstName: "",
        lastName: "",
        userName: "",
        userType: "",
        password: "",
      };
      console.log(this.user);
      this.hideAddUser();
    },
  },
   watch: {
      edituser:{
        immediate: true,
        handler(newVal, oldVal) {
          if(newVal){
            console.log(oldVal,newVal);
            this.user=newVal;
        }
      }
    }
  }
}
</script>
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
                <img
                  src="../assets/images/user_img.png"
                  class="display-user-img"
                />
                <!-- <img v-bind:src="'data:image/jpeg;base64,'+ data.imageContent" v-if="data.imageId!=null" class="display-user-img"/> -->
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
    <AddUser
      :isAddUser.sync="isAddUser"
      v-bind:edituser="edituser"
      v-on:clear-add-user="clearAddForm"
      v-on:add-user="addUser"
      v-on:update-user="updateUser"
    />
    <MessageSuccess :msg="successmsg" v-on:on-success="getUsers" />
    <MessageError :msg="errormsg" v-on:on-error="onError" />
  </div>
</template>
<script>
import userService from "../services/userService";
//import appDataMixin from '../mixins/appDataMixin'
import MessageSuccess from "@/components/MessageSuccess.vue";
import MessageError from "@/components/MessageError.vue";
import AddUser from '../components/AddUser.vue';
import MediarelatedService from '../services/MediarelatedService';
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
      edituser: {},
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
      files:"",
    };
  },
  components: {
    MessageSuccess,
    MessageError,
    AddUser,
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
          this.errormsg = err.messge;
          console.log(err.message);
        });
    },
    showAddUser() {
      this.isAddUser = true;
    },
     addUser(data,data1) {
       this.files=data1;
       this.errormsg = "";
       if(!data.firstName){
        this.errormsg = "Please enter first name";
         return;
       }
      
      userService
        .addUser(data)
        .then(
          (response) => 
            {
    if(this.files != '')
            {
              const files = this.files;
              MediarelatedService.uploadfile(files, response.data.userId, 1)
                .then((response) => {            
                  console.log("response", response);
                })
              .catch((err) => {
                (this.errormsg = "error occured"), console.log(err.message);
              });
            }
         
    this.successmsg = "user added";
    this.isAddUser = false;
          }
        )
        .catch((err) => {
          (this.errormsg = err.messge), console.log(err.message);
        });
    },
    updateUser(data) {
      this.errormsg = "";
      if(!this.validateUser(data,false)){
        return;
      }
      userService
        .updateUser(data)
        .then(
          (response) => {
            this.successmsg = "user updated";
            this.isAddUser = false
            }
        )
        .catch((err) => {
          (this.errormsg = err.messge), console.log(err.message);
        });
    },
    validateUser(data,isadd) {
      //var isValid=true;
      if (!data.firstName) {
        this.errormsg = "Please enter first name";
         return false;
      }
      if (!data.lastName) {
        this.errormsg = this.errormsg + "Please enter last name";
         return false;
      }
      if (!data.userType) {
        this.errormsg = this.errormsg + "Please select user type";
          return false;
      }
       if (!data.userName) {
        this.errormsg = this.errormsg + "Please enter user name";
          return false;
      }
       if (isadd && !data.password ) {
        this.errormsg = this.errormsg + "Please enter password";
          return false;
      }
      return true;
      
    },
    editUser: function(data) {
      console.log(data);
      this.edituser = data;
      this.isAddUser = true;
    },
    onError() {
      console.log("onError parent");
      this.errormsg = "";
    },
    clearAddForm() {
      this.isAddUser = false;
    },
  },
};
</script>
